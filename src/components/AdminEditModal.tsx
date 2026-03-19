export default function AdminEditModal({
  editPost,
  setEditPost,
  editTitle,
  setEditTitle,
  setEditFile,
  handleEditSave,
}: any) {
  if (!editPost) return null;

  return (
    <div className="modal-overlay" onClick={() => setEditPost(null)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Post</h2>

        <div className="modal-field">
          <label>Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Change Media</label>
          <input
            type="file"
            onChange={(e) => setEditFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* PREVIEW */}
        <div
          style={{
            marginTop: "12px",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "8px",
          }}
        >
          {editPost.type === "video" ? (
            <video
              src={editPost.media_url}
              style={{ width: "100%", maxHeight: "180px" }}
              controls
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={editPost.media_url}
              style={{ width: "100%", maxHeight: "180px", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={() => setEditPost(null)}>
            Cancel
          </button>

          <button className="modal-save" onClick={handleEditSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
