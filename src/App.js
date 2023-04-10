import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
