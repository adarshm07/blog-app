import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allPosts } from "../store/postsSlice";
import Layout from "../components/Layout";

export default function Blog() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.loggedIn);

  const [blogPosts, setBlogPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);

  // The 'fetchAllBlog' function is triggered, fetching all the blog posts using the URL specified in axios.get.
  const fetchAllBlog = async (page, limit) => {
    const data = await axios.get(
      `http://localhost:4000/api/v1/blog/getAll?page=${page}&limit=${limit}`
    );
    const response = await data.data.data;
    dispatch(allPosts(response));

    // reverse the array to display the latest post first
    const reversed = [...response].reverse();
    setBlogPosts(reversed);
  };

  // The 'deletePostById' function calls the API with the specified ID to delete a blog post. If the request is successful,
  // a toast message is displayed, and the 'fetchAllBlog' function is called to update the list of blog posts.
  const deletePostById = async (id, page, limit) => {
    const data = await axios.delete(
      `http://localhost:4000/api/v1/blog/delete/${id}`
    );
    if (data.data.statusCode === 201) toast("Post Deleted Successfully");
    fetchAllBlog(page, limit);
  };

  // useEffect lifecycle hook is used to load the post details from the server and update the app state upon component mount.
  useEffect(() => {
    fetchAllBlog(page, limit);
  }, [page, limit]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center bg-primary text-white"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">Blog</h1>
      </div>
      {blogPosts &&
        blogPosts.map((item) => {
          return (
            <div key={item._id} className="card my-4">
              <div className="card-body">
                {item.category && (
                  <span className="badge bg-primary text-white my-2">
                    {item.category.title}
                  </span>
                )}
                <h5 className="card-title">{item.title}</h5>

                <div className="d-flex justify-content-between">
                  {/* show edit and delete btn only if user is logged in. */}
                  {isLoggedIn && (
                    <div className="d-flex gap-1 mt-4">
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
      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-5">
          <li className={`page-item ${page === 1 && "disabled"}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          <li className={`page-item ${blogPosts.length < 5 && "disabled"}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Layout>
  );
}
