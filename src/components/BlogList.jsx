import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../store/postsSlice";
import { toast } from "react-toastify";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.posts.allPosts);

  const fetchAllBlog = async () => {
    const data = await axios.get(`http://localhost:4000/api/v1/blog/getAll`);
    const response = await data.data.data;
    dispatch(allPosts(response));
  };

  const deletePostById = async (id) => {
    const data = await axios.delete(
      `http://localhost:4000/api/v1/blog/delete/${id}`
    );
    if (data.data.statusCode === 201) toast("Post Deleted Successfully");
    fetchAllBlog();
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      <button onClick={() => (window.location.href = "/add-blog")}>
        Add blog
      </button>
      {blogs &&
        blogs.map((item) => {
          return (
            <div key={item._id}>
              <h3>{item.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
              <Link to={`/blog/${item._id}`}>Read more</Link>
              <button onClick={() => window.open(`/edit-blog/${item._id}`)}>
                Edit
              </button>
              <button onClick={() => deletePostById(item._id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default BlogList;
