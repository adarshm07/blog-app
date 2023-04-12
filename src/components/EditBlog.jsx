import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "./TextEditor";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blog/get/${id}`)
      .then((response) => {
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
      .put(`http://localhost:4000/api/v1/blog/update/${id}`, blog)
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
        <TextEditor value={content} setValue={setContent} />
        <button>Edit Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
