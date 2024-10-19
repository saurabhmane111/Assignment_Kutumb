// src/pages/QuoteCreation.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuoteCreation() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload image
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Create quote
      await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        {
          text,
          mediaUrl: uploadResponse.data.mediaUrl,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      navigate("/quotes");
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to create quote. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Quote Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Create Quote</button>
      </form>
    </div>
  );
}

export default QuoteCreation;
