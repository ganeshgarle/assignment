import React, { useState } from "react";
import useFileUpload from "../../api/hooks";

const CompareFile = () => {
  const { error, isLoading, response, uploadFiles } = useFileUpload("compare");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadFiles(file1, file2);
  };

  return (
    <div>
      <h1>File comparison app</h1>

      <form onSubmit={handleSubmit}>
        <div className="file-container">
          <label htmlFor="file1">Upload File 1:</label>
          <input
              type="file"
              className="file-input"
              onChange={(e) => handleFileChange(e, setFile1)}
            />
        </div>
        <div className="file-container">
          <label htmlFor="file2">Upload File 2:</label>
           <input
              type="file"
              className="file-input"
              onChange={(e) => handleFileChange(e, setFile2)}
            />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Comparing..." : "Compare Files"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Comparison Results:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CompareFile;
