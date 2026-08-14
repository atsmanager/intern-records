import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regEx.test(email) || password.length < 6) {
      setError("Please enter a valid email and a password with at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${VITE_API_URL}/admin/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password, company }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      if (data?.message) alert(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
    setEmail("");
    setPassword("");
    setUsername("");
    setCompany("");
  };

  return (
    <div className="register-container">
      <div className="auth-card">
        <p style={{ textAlign: "center", color: "#ffffff", fontSize: "13px", marginBottom: "8px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
          Logged in as Admin
        </p>
        <h2 className="auth-title" style={{ marginBottom: "8px" }}>Add User</h2>
        <p className="auth-subtitle">Create a new team member account</p>

        <form className="auth-form" onSubmit={handleCreateUser}>
          <input
            type="text"
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="text"
            className="auth-input"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          {error && (
            <div style={{
              color: "#ff6b6b",
              background: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.2)",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-auth-primary"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>

          <div style={{ textAlign: "center", marginTop: "4px" }}>
            <button
              type="button"
              onClick={() => navigate('/update-password')}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
                fontFamily: "inherit",
              }}
            >
              Update users passwords?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
