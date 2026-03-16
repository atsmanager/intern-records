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

  // --- Reset Password Logic restored for you, Annaya! ---
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
        throw new Error("Enter a valid mail");
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

      setIsOpen(true); // Opens the OTP popup
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
          <span style={{ fontSize: "40px" }}>🔐</span>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Portfolio Admin Panel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
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
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div style={styles.resetContainer}>
            <button
              style={styles.resetBtn}
              onClick={handleResetPassword}
              type="button"
            >
              Reset password?
            </button>
          </div>
        </form>

        <p style={styles.footerText}>
          Access credentials are managed via the secure environment configuration.
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
    width: "100%",
  },
  card: {
    padding: "45px 40px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    margin: "12px 0 4px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "14px",
    color: "#ffffff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    marginTop: "10px",
  },
  resetContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  resetBtn: {
    background: "none",
    border: "none",
    color: "#6b7280",
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "500",
  },
  footerText: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: "1.6",
  },
  errorBox: {
    color: "#b91c1c",
    backgroundColor: "#fef2f2",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "13px",
  },
};

export default LoginPage;