import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VITE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const VerifyPopUp = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(30);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP first!");
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_URL}/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) { 
        toast.error("Invalid OTP! Try again."); 
        setIsLoading(false); 
        return; 
      }
      const res = await response.json();
      if (res.verified) {
        toast.success("OTP Verified Successfully");
        navigate('/reset-password', { state: { email } });
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (e) {
      console.error(`Error at VerifyPopUp: ${e}`);
      toast.error("Something went wrong with the server!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setIsResending(true);
    try {
      const response = await fetch(`${VITE_URL}/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to send OTP");
      
      toast.success("OTP Resent Successfully");
      setCooldown(30); // Reset cooldown
    } catch (e) {
      console.error(`Error resending OTP: ${e}`);
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
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
          style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer", marginBottom: "10px" }}
        >
          {isLoading ? "Verifying..." : "Verify Now ✅"}
        </button>
        
        <button
          onClick={handleResendOtp}
          disabled={cooldown > 0 || isResending}
          style={{
            background: "transparent",
            color: cooldown > 0 ? "#888" : "#fbbf24",
            border: "none",
            cursor: cooldown > 0 || isResending ? "not-allowed" : "pointer",
            fontSize: "14px",
            textDecoration: "underline",
            marginTop: "10px",
            width: "100%"
          }}
        >
          {isResending 
            ? "Sending..." 
            : cooldown > 0 
              ? `Resend OTP in ${cooldown}s` 
              : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyPopUp;