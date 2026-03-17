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
  id: string,
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
      credentials: "include",
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
        throw new Error("Enter a valid mail to reset");
      }

      const data = await roleCheck.json();

      if (data.role !== "superadmin") {
        alert("Only super admin can reset password! 🙅‍♂️");
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
    <div style={styles.container}>
      {isOpen && <VerifyPopUp email={email} />}
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>🔐</span>
          <h1 style={styles.title}>Admin Login</h1>
        </div>
        <p style={styles.subtitle}>ATS Admin Panel</p>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password *"
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
            {isLoading ? "LOADING..." : "LOGIN"}
          </button>

          <p style={styles.footerText}>
            Access credentials are managed via the secure environment configuration.
          </p>

          <div style={styles.resetContainer}>
            <button
              style={styles.resetBtn}
              onClick={handleResetPassword}
              type="button"
            >
              Forgot/Reset password?
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
    minHeight: "100vh",
    backgroundColor: "#f8fafc", // Light grey background like the image
    width: "100%",
  },
  card: {
    padding: "40px 35px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontFamily: "'Inter', sans-serif, system-ui",
    textAlign: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "5px",
  },
  icon: {
    fontSize: "28px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "30px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    color: "#333",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "15px",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "16px",
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    marginTop: "10px",
    backgroundColor: "#2563eb", // Solid blue like the image
    transition: "background-color 0.2s",
  },
  footerText: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#666",
    lineHeight: "1.5",
    padding: "0 20px",
    fontWeight: "500",
  },
  resetContainer: {
    marginTop: "15px",
  },
  resetBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
    opacity: 0.8,
  },
  errorBox: {
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "13px",
    border: "1px solid #fee2e2",
  },
};

export default LoginPage;