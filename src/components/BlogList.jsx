import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/blog/getAll`).then((response) => {
      setBlogs(response.data.data);
    });
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
            <Link to={`/blog/${blog._id}`}>Read more</Link>
            <button onClick={() => window.open(`/edit-blog/${blog._id}`)}>
              Edit
            </button>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
