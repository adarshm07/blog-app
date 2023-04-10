import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/blog/get/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title: title, description: content };
    axios
      .put(`http://localhost:8080/api/v1/blog/update/${id}`, blog)
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          required
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button>Edit Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
