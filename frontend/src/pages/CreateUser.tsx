import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regEx.test(email) || password.length < 6) {
      setError(
        "Please enter a valid email and a password with at least 6 characters.",
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${VITE_API_URL}/admin/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);
      if (data) {
        if (data.message) {
          alert(data.message);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const navigateToUpdate = (e:React.FormEvent) => {
    e.preventDefault()
    navigate('/update-password')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p className="text-center opacity-50 font-semibold">
          Logged in as Admin
        </p>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Add User
        </h2>
        <form onSubmit={handleCreateUser}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
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
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create user"}
          </button>

          <div className="flex justify-end m-4 hover:text-blue-500">
            <button onClick={navigateToUpdate}>Update users passwords?</button>
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
    height: "100vh",
    width: "50vw",
    backgroundColor: "#f0f2f5",
    borderRadius: "10px",
  },
  card: {
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "10px",
  },
  errorBox: {
    color: "#d9534f",
    backgroundColor: "#fdeded",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPage;
