import React from "react";

export default function AdminSidebar({ onLogout }: any) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>⬡ Media CMS</h2>
        <span>Admin Dashboard</span>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">📁 Media Library</button>

        <button className="nav-item" onClick={() => window.open("/", "_blank")}>
          🌐 View Gallery
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-avatar">N</div>
          <div>
            <div className="user-name">Nahid</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
