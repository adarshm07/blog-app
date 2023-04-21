import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  console.log(isLoggedIn);

  const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="/add-blog" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AddBlog /></ProtectedRoute>} />
        <Route path="/edit-blog/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><EditBlog /></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Category /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
