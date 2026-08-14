import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const VITE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const VerifyPopUp = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter the OTP first!");
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_URL}/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) { alert("Invalid OTP! Try again."); setIsLoading(false); return; }
      const res = await response.json();
      if (res.verified) {
        navigate('/reset-password', { state: { email } });
      } else {
        alert("OTP verification failed.");
      }
    } catch (e) {
      console.error(`Error at VerifyPopUp: ${e}`);
      alert("Something went wrong with the server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <h2 className="otp-title">Verify OTP 🛡️</h2>
        <p className="otp-sub">A code was sent to: <strong style={{ color: "#ffffff" }}>{email}</strong></p>
        <input
          type="text"
          className="auth-input"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          disabled={isLoading}
          className="btn-auth-primary"
          style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? "Verifying..." : "Verify Now ✅"}
        </button>
      </div>
    </div>
  );
};

export default VerifyPopUp;