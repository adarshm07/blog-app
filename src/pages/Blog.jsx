import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allPosts } from "../store/postsSlice";
import Layout from "../components/Layout";

export default function Blog() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.posts.allPosts);
  // you can also use a normal useState hook to store the blog posts, redux is used when you have
  // some data which you need in more than one page or like globally over the application.

  const isLoggedIn = useSelector((state) => state.user.loggedIn);

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
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center bg-primary text-white"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">Blog</h1>
      </div>
      {blogs &&
        blogs.map((item) => {
          return (
            <div key={item._id} className="card my-4">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>

                <div className="d-flex justify-content-between">
                  {/* show edit and delete btn only if user is logged in. */}
                  {isLoggedIn && (
                    <div className="d-flex gap-1">
                      <Link
                        className="btn btn-sm btn-primary px-4"
                        to={`/edit-blog/${item._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-warning px-4"
                        onClick={() => deletePostById(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <Link to={`/blog/${item._id}`}>Read more</Link>
                </div>
              </div>
            </div>
          );
        })}
    </Layout>
  );
}
