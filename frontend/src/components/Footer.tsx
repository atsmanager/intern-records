import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      background: "#0d0d12", 
      borderTop: "1px solid rgba(255,255,255,0.08)", 
      padding: "24px", 
      textAlign: "center",
      marginTop: "auto"
    }}>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
        <Link to="/privacy-policy" style={{ color: "#a0a0b8", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</Link>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <Link to="/refund-policy" style={{ color: "#a0a0b8", textDecoration: "none", fontSize: "14px" }}>Refund & Cancellation Policy</Link>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <Link to="/terms" style={{ color: "#a0a0b8", textDecoration: "none", fontSize: "14px" }}>Terms & Conditions</Link>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <Link to="/support" style={{ color: "#a0a0b8", textDecoration: "none", fontSize: "14px" }}>Contact Us</Link>
      </div>
      <div style={{ marginTop: "16px", color: "rgba(160,160,184,0.6)", fontSize: "12px" }}>
        &copy; {new Date().getFullYear()} Centennial Infotech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
