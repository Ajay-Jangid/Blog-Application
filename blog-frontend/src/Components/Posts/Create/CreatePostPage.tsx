import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        const validationErrors: { title?: string; content?: string } = {};

        if (!title.trim()) validationErrors.title = "Title is required.";
        if (!content.trim()) validationErrors.content = "Content is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await fetch("http://localhost:8082/posts", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        setSuccessMessage("Post created successfully! Redirecting to Dashboard...");

        setTitle("");
        setContent("");

        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    };

    return (
        <div className="create-post-container">
            <div className="create-post-box">
                <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
                <h2>Create a New Post</h2>

                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="create-post-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter post title..."
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                            }}
                            className={`input-field ${errors.title ? "error-border" : ""}`}
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </div>

                    <div className="input-group">
                        <textarea
                            placeholder="Write your post content..."
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
                            }}
                            className={`textarea-field ${errors.content ? "error-border" : ""}`}
                        />
                        {errors.content && <p className="error-message">{errors.content}</p>}
                    </div>

                    <button type="submit" className="submit-btn">Publish</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
