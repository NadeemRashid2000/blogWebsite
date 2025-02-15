import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/UploadFiles.css"; // Importing CSS file

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleUpload = async () => {
    if (!file) return alert("No file selected!");
    if (!user) return alert("Login required!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/blogs/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });

    alert("File uploaded successfully!");
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload PDF</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
