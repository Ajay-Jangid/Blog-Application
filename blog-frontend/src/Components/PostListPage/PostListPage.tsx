import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostListPage.css"; // Create a CSS file for styling

const PostsListPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8082/posts");
                if (!res.ok) throw new Error("Failed to fetch posts.");

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError("Error fetching posts. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="posts-list-container">
            <header className="posts-header">
                <h2>All Posts</h2>
                <Link to="/login" className="login-button">Login</Link>
            </header>

            {loading && <p className="loading">Loading posts...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-content">{post.content.substring(0, 100)}...</p>
                        <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsListPage;
