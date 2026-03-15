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
  id:string,
  email: string;
  user: string;
  role: string;
};

const VITE_URL = import.meta.env.VITE_API_URL;

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
      credentials:"include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        throw new Error("Failed to check role");
      }

      const data = await roleCheck.json();

      if (data.role !== "superadmin") {
        alert("Only super admin can reset password");
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
      setError("Please enter a valid email and password");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchUser();

      localStorage.setItem("authToken", data.token);

      const user: User = {
        id:data.user.id,
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
    <div style={styles.container}>
      {isOpen && <VerifyPopUp email={email} />}
      <div style={styles.card}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
            <button
              style={styles.resetBtn}
              onClick={handleResetPassword}
              type="button"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    backgroundColor: "#ffffff", 
    width: "100%",
  },
  card: {
    padding: "50px 40px",
    borderRadius: "24px",
    backgroundColor: "#0a3d62", 
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    color: "white",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    fontSize: "14px",
    color: "#e0e0e0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #1e5a84",
    backgroundColor: "#104e7a", 
    color: "white",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    color: "#0a3d62",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    marginTop: "20px",
    background: "linear-gradient(to right, #1dd1a1, #10ac84)", // Teal gradient
    transition: "0.3s",
  },
  resetBtn: {
    background: "none",
    border: "none",
    color: "#a0a0a0",
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "none",
  },
  errorBox: {
    color: "#ff6b6b",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPage;