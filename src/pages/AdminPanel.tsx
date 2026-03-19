import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import "./AdminPanel.css";

import AdminLogin from "../components/AdminLogin";
import AdminUpload from "../components/AdminUpload";
import AdminTable from "../components/AdminTable";
import AdminEditModal from "../components/AdminEditModal";
import AdminSidebar from "../components/AdminSidebar";

type Post = {
  id: string;
  title: string;
  media_url: string;
  type: string;
  created_at: string;
};

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });
  const [loginError, setLoginError] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  /* ───────── AUTH ───────── */

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setAuthed(true);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) setAuthed(false);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.user,
      password: loginForm.pass,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setAuthed(true);
      setLoginError("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  /* ───────── DATA ───────── */

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  };

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  /* ───────── CRUD ───────── */

  const handleUpload = async () => {
    if (!file || !title) return;

    const fileName = `${Date.now()}-${file.name}`;

    await supabase.storage.from("media").upload(fileName, file);

    const { data } = supabase.storage.from("media").getPublicUrl(fileName);

    await supabase.from("posts").insert({
      title,
      media_url: data.publicUrl,
      type: file.type.startsWith("video") ? "video" : "image",
    });

    setFile(null);
    setTitle("");
    fetchPosts();
  };

  const handleDelete = async (id: string, url: string) => {
    const fileName = url.split("/media/")[1];
    await supabase.storage.from("media").remove([fileName]);
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  const openEdit = (post: Post) => {
    setEditPost(post);
    setEditTitle(post.title);
  };

  const handleEditSave = async () => {
    if (!editPost) return;

    let newUrl = editPost.media_url;
    let newType = editPost.type;

    if (editFile) {
      const oldFile = editPost.media_url.split("/media/")[1];
      await supabase.storage.from("media").remove([oldFile]);

      const fileName = `${Date.now()}-${editFile.name}`;
      await supabase.storage.from("media").upload(fileName, editFile);

      const { data } = supabase.storage.from("media").getPublicUrl(fileName);

      newUrl = data.publicUrl;
      newType = editFile.type.startsWith("video") ? "video" : "image";
    }

    await supabase
      .from("posts")
      .update({
        title: editTitle,
        media_url: newUrl,
        type: newType,
      })
      .eq("id", editPost.id);

    setEditPost(null);
    setEditFile(null);
    fetchPosts();
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* ───────── UI ───────── */

  if (!authed) {
    return (
      <AdminLogin
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
        loginError={loginError}
      />
    );
  }

  return (
    <>
      <div className="admin-layout">
        {/* SIDEBAR */}
        <AdminSidebar onLogout={handleLogout} />

        {/* MAIN CONTENT */}
        <main className="admin-main">
          <AdminUpload
            title={title}
            setTitle={setTitle}
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
          />

          <AdminTable
            posts={filtered}
            handleDelete={handleDelete}
            openEdit={openEdit}
          />

          <AdminEditModal
            editPost={editPost}
            setEditPost={setEditPost}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            setEditFile={setEditFile}
            handleEditSave={handleEditSave}
          />
        </main>
      </div>
    </>
  );
}
