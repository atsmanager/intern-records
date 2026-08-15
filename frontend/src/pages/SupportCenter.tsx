import React from 'react';
import { useNavigate } from 'react-router-dom';

const SupportCenter = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "80px 20px", minHeight: "100vh", background: "#000" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a0a0b8', cursor: 'pointer', fontSize: '14px', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
        >
          ← Back
        </button>

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "900", color: "#fff", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Support Center</h1>
          <p style={{ color: "#a0a0b8", fontSize: "16px", lineHeight: "1.7", maxWidth: "540px", margin: "0 auto" }}>
            Need assistance? Our support team is here to help. Choose the support option that works best for you.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Email Support */}
          <div style={{ background: "#0d0d12", borderRadius: "16px", padding: "40px 32px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px" }}>
              📧
            </div>
            <h3 style={{ fontSize: "22px", color: "#fff", fontWeight: "700", marginBottom: "10px" }}>Email Support</h3>
            <p style={{ color: "#a0a0b8", marginBottom: "24px", fontSize: "15px" }}>Contact our support team directly via email.</p>
            <a
              href="mailto:support@centennialinfotech.com"
              style={{ display: "inline-block", background: "rgba(168, 85, 247, 0.2)", color: "#c084fc", textDecoration: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", border: "1px solid rgba(168, 85, 247, 0.4)", fontSize: "14px" }}
            >
              support@centennialinfotech.com
            </a>
          </div>

          {/* Live Chat */}
          <div style={{ background: "#0d0d12", borderRadius: "16px", padding: "40px 32px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px" }}>
              💬
            </div>
            <h3 style={{ fontSize: "22px", color: "#fff", fontWeight: "700", marginBottom: "10px" }}>Live Chat</h3>
            <p style={{ color: "#a0a0b8", marginBottom: "24px", fontSize: "15px" }}>Chat with our team in real time for quick assistance.</p>
            <button
              style={{ background: "#10b981", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "15px" }}
            >
              Start Live Chat
            </button>
          </div>

          {/* Create a Ticket */}
          <div style={{ background: "#0d0d12", borderRadius: "16px", padding: "40px 32px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px" }}>
              🎫
            </div>
            <h3 style={{ fontSize: "22px", color: "#fff", fontWeight: "700", marginBottom: "10px" }}>Create a Ticket</h3>
            <p style={{ color: "#a0a0b8", marginBottom: "24px", fontSize: "15px" }}>Submit a support request and we'll get back to you.</p>
            <button
              style={{ background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "15px" }}
            >
              Create Ticket
            </button>
          </div>

          {/* Response Times */}
          <div style={{ background: "#0d0d12", borderRadius: "16px", padding: "36px 32px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontSize: "22px", color: "#fff", fontWeight: "700", marginBottom: "24px" }}>Response Times</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ color: "#a0a0b8", display: "flex", alignItems: "center", gap: "14px", fontSize: "15px" }}>
                <span>📧</span> Email Support: Within 24 hours
              </li>
              <li style={{ color: "#a0a0b8", display: "flex", alignItems: "center", gap: "14px", fontSize: "15px" }}>
                <span>💬</span> Live Chat: Usually within a few minutes
              </li>
              <li style={{ color: "#a0a0b8", display: "flex", alignItems: "center", gap: "14px", fontSize: "15px" }}>
                <span>🎫</span> Support Tickets: Within 1 business day
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
