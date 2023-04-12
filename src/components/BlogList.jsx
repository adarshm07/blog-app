import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../store/postsSlice";
import { toast } from "react-toastify";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.posts.allPosts);

  // The 'fetchAllBlog' function is triggered, fetching all the blog posts using the URL specified in axios.get.
  const fetchAllBlog = async () => {
    const data = await axios.get(`http://localhost:4000/api/v1/blog/getAll`);
    const response = await data.data.data;
    dispatch(allPosts(response));
  };

  // The 'deletePostById' function calls the API with the specified ID to delete a blog post. If the request is successful,
  // a toast message is displayed, and the 'fetchAllBlog' function is called to update the list of blog posts.
  const deletePostById = async (id) => {
    const data = await axios.delete(
      `http://localhost:4000/api/v1/blog/delete/${id}`
    );
    if (data.data.statusCode === 201) toast("Post Deleted Successfully");
    fetchAllBlog();
  };

  // useEffect lifecycle hook is used to load the post details from the server and update the app state upon component mount.
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
