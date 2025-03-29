import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import CreatePostPage from "./Components/Posts/Create/CreatePostPage";
import PostDetailPage from "./Components/Posts/Details/PostDetailPage";
import PostsListPage from "./Components/PostListPage/PostListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetailPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
