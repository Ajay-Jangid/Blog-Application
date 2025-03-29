import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetailPage.css"; 

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:8082/posts/${id}`);
                if (!res.ok) throw new Error("Failed to fetch post.");

                const data = await res.json();
                setPost(data);
            } catch (err) {
                setError("Error fetching post. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="loading">Loading post details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="post-detail-container">
            <div className="post-detail-box">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
            </div>
        </div>
    );
};

export default PostDetailPage;
