import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";

function AddBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/api/v1/blog/add`, {
        title: title,
        description: content,
      })
      .then((response) => {
        // console.log(response);
        navigate("/");
      });
  }

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <TextEditor value={content} setValue={setContent} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
