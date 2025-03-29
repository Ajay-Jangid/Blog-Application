import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8082/posts/user", { credentials: "include" });
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8082/user/profile", { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/");
            });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8082/auth/logout", {
                method: "GET",
                credentials: "include",
            });

            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleDeletePost = async (postId: string) => {
        try {
            await axios.delete(`http://localhost:8082/posts/${postId}`, { withCredentials: true });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Dashboard</h2>
                {user ? (
                    <div className="user-info">
                        <p>Welcome, <strong>{user.name}</strong></p>
                        <p>Email: {user.email}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="posts-section">
                <button className="create-post-btn" onClick={() => navigate("/create-post")}>Create Post</button>
                {posts.length > 0 ?
                    <ul className="posts-list">
                        {posts.map((post) => (
                            <li key={post._id} className="post-item">
                                <span className="post-title" onClick={() => navigate(`/post/${post._id}`)}>
                                    {post.title}
                                </span>
                                <button className="delete-btn" onClick={() => handleDeletePost(post._id)}>🗑</button>
                            </li>
                        ))}
                    </ul>
                    :
                    <h4>No Posts Available </h4>}
            </div>
        </div>
    );
};

export default Dashboard;
