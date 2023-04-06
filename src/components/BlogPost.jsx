import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPost = ({ match }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.example.com/posts/${match.params.id}`)
      .then((response) => {
        setBlog(response.data);
      });
  }, [match.params.id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
    </div>
  );
};

export default BlogPost;
