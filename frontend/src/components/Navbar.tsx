import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/authStore";
import Logo from "../assets/logo.jpeg";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useLoginStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/?logout=success");
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" style={{ textDecoration: "none", flexDirection: "row", alignItems: "center", gap: "12px" }}>
          <img
            src={Logo}
            alt="Centennial Infotech"
            style={{ height: "70px", borderRadius: "8px" }}
          />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="navbar-logo-name">
              <span>Applicants</span><span>Records</span>
            </div>
            <div className="navbar-logo-sub">
              Manage your candidates easily
            </div>
          </div>
        </Link>

        {/* Always show hamburger on mobile so users can access public links like Pricing */}
        <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Nav links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {user && (
            <li>
              <Link to="/profile" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                My Profile
              </Link>
            </li>
          )}
          <li>
            <Link to="/pricing" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
              Pricing
            </Link>
          </li>
          {user && user.role === "superadmin" && (
            <li>
              <Link to="/all-users" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                All Users
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/add-candidate" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                Add Candidate
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/import-candidate" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                Import Data
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/all-candidate" style={{ textDecoration: "none" }} onClick={() => setIsMobileMenuOpen(false)}>
                All Candidates
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button className="btn-go-premium" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
