export default function AdminTable({ posts, handleDelete, openEdit }: any) {
  return (
    <div className="table-panel">
      <div className="table-toolbar">
        <h2>All Posts</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td className="thumb-cell">
                {post.type === "video" ? (
                  <video src={post.media_url} />
                ) : (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src={post.media_url} />
                )}
              </td>

              <td className="title-cell">{post.title}</td>

              <td>
                <span className={`type-pill ${post.type}`}>{post.type}</span>
              </td>

              <td className="date-cell">{post.created_at}</td>

              <td>
                <div className="actions-cell">
                  <button
                    className="action-btn edit"
                    onClick={() => openEdit(post)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(post.id, post.media_url)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
