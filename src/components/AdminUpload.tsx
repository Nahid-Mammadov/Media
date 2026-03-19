export default function AdminUpload({
  title,
  setTitle,
  file,
  setFile,
  handleUpload,
}: any) {
  return (
    <div className="upload-panel">
      <h2>Upload New Media</h2>

      <div className="upload-row">
        <div className="field-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label>File</label>
          <div className="file-input-wrapper">
            <div className={`file-input-label ${file ? "has-file" : ""}`}>
              {file ? file.name : "Choose file..."}
            </div>

            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
          </div>
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}
