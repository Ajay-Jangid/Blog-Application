import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        } else {
            const checkTokenFromCookies = async () => {
                const response = await fetch("http://localhost:8082/auth/token", {
                    credentials: "include", 
                });
                const data = await response.json();

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    navigate("/dashboard");
                }
            };
            checkTokenFromCookies();
        }
    }, [navigate]);

    const handleOAuthLogin = (provider: "google" | "facebook") => {
        window.location.href = `http://localhost:8082/auth/${provider}`;
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <button className="google-btn" onClick={() => handleOAuthLogin("google")}>
                    Sign in with Google
                </button>
                <button className="facebook-btn" onClick={() => handleOAuthLogin("facebook")}>
                    Sign in with Facebook
                </button>
            </div>
        </div>
    );
};

export default Login;
