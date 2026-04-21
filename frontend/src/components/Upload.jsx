
import React, { useState } from "react";
import { uploadDocument } from "../api";

function Upload({ setDocumentReady }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    try {
       setStatus("Uploading...");
       await uploadDocument(file);
       setDocumentReady(true);
       setStatus("✅ Document uploaded successfully!");
     } catch {
       setStatus("❌ Upload failed");
     }
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-white font-semibold mb-5">📄 Upload Document</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-8 text-gray-200"
      />

       <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Upload
      </button>

      {status && (<p className="text-sm text-green-400 mt-2">{status}</p>)}

    </div>
  );
}

export default Upload;