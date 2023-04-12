import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blog/get/${id}`)
      .then((response) => {
        setBlog(response.data.data);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
    </div>
  );
};

export default BlogPost;
