import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(location.state ? location.state.email : "");
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const HandleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length === 0) { toast.error('Enter a valid password'); return; }
    if (confirmPassword !== password) { toast.error('Password does not match'); return; }

    const response = await fetch(`${VITE_API_URL}/admin/update-password`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast.success("Updated password successfully");
      navigate('/');
    }
  };

  return (
    <div className="register-container">
      <div className="auth-card">
        <h2 className="auth-title">Update Password</h2>
        <p className="auth-subtitle">Change a user's password below</p>

        <form className="auth-form" onSubmit={HandleUpdatePassword}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;