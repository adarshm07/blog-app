import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Layout from "../components/Layout";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

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
    <Layout>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor value={content} setValue={setContent} />
        <button>Edit Blog</button>
      </form>
    </Layout>
  );
};

export default EditBlog;
