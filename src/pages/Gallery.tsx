import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Gallery.css";

const supabase = createClient(
  "https://ppbibhfkvcwxbazjpgjd.supabase.co",
  "sb_publishable_Q53ug10O6klAYBIBtfHvQw_erm4SCSe",
);

type Post = {
  id: string;
  title: string;
  media_url: string;
  type: string;
  created_at: string;
};

type Filter = "all" | "image" | "video";

export default function Gallery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Post | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const filtered = posts.filter((p) => {
    const matchesType = filter === "all" ? true : p.type === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <>
      <div className="gallery-root">
        <header className="gallery-header">
          <div className="gallery-header-left">
            <h1>
              Media
              <br />
              <span>Gallery</span>
            </h1>
            <p>Visual Archive — Images & Video</p>
          </div>
          <a href="/admin" className="admin-link">
            ⬡ Admin Panel
          </a>
        </header>

        <div className="gallery-filters">
          <span className="filter-label">Filter:</span>

          {(["all", "image", "video"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "image" ? "Images" : "Videos"}
            </button>
          ))}

          {/* SEARCH */}
          <input
            className="search-input"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="gallery-count">
          {filtered.length} {filter === "all" ? "items" : filter + "s"}
        </div>

        {loading ? (
          <div className="gallery-loading">Loading collection…</div>
        ) : filtered.length === 0 ? (
          <div className="gallery-empty">
            <h2>Nothing here yet</h2>
            <p style={{ color: "rgba(240,237,232,0.2)", fontSize: "0.9rem" }}>
              Upload media from the admin panel
            </p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map((post) => (
              <div
                className="gallery-item"
                key={post.id}
                onClick={() => setSelected(post)}
              >
                {post.type === "video" ? (
                  <video src={post.media_url} muted playsInline />
                ) : (
                  <img src={post.media_url} alt={post.title} loading="lazy" />
                )}
                <div className="gallery-item-overlay">
                  <p className="gallery-item-title">{post.title}</p>
                </div>
                <span className="type-badge">
                  {post.type === "video" ? "▶ Video" : "◼ Image"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div className="lightbox-overlay" onClick={() => setSelected(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            {selected.type === "video" ? (
              <video src={selected.media_url} controls autoPlay />
            ) : (
              <img src={selected.media_url} alt={selected.title} />
            )}
            <p className="lightbox-title">{selected.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
