import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyPopUp from "../components/VerifyOTP";
import { useLoginStore } from "../store/authStore";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    role: string;
    name: string;
  };
}

type User = {
  id: string;
  email: string;
  user: string;
  role: string;
};

const VITE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useLoginStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUser = async (): Promise<LoginResponse> => {
    const response = await fetch(`${VITE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || "Invalid email or password");
    }

    return response.json();
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }

    try {
      const roleCheck = await fetch(
        `${VITE_URL}/admin/check-role?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!roleCheck.ok) {
        throw new Error("Enter a valid email to reset");
      }

      const data = await roleCheck.json();

      if (data.role !== "superadmin") {
        alert("Only super admin can reset password 🙅‍♂️");
        return;
      }

      const response = await fetch(`${VITE_URL}/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset mail");
      }

      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regEx.test(email) || password.length < 6) {
      setError("Please enter a valid email and password (min 6 chars)");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchUser();

      localStorage.setItem("authToken", data.token);

      const user: User = {
        id: data.user.id,
        email,
        user: data.user.name,
        role: data.user.role,
      };

      login(user);
      navigate("/add-candidate");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {isOpen && <VerifyPopUp email={email} />}
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          {error && (
            <div
              style={{
                color: "#ff6b6b",
                background: "rgba(255,107,107,0.08)",
                border: "1px solid rgba(255,107,107,0.2)",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-auth-primary"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="auth-forgot">
            <button
              type="button"
              onClick={handleResetPassword}
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
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;