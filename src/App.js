import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
