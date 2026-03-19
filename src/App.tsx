// App.tsx — React Router v6 integration
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

// ─── File structure ───
// src/
//   api/
//     supabaseClient.ts     ← shared supabase client
//   pages/
//     Gallery.tsx           ← public gallery (/)
//     AdminPanel.tsx        ← admin panel (/admin)
//   App.tsx                 ← routes (this file)
//
// ─── Install dependencies ───
// npm install @supabase/supabase-js react-router-dom
