import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/authStore";
import Logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { user, logout } = useLoginStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
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

        {/* Nav links */}
        <ul className="navbar-links">
          {user && user.role === "superadmin" && (
            <li>
              <Link to="/all-users" style={{ textDecoration: "none" }}>
                All Users
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/add-candidate" style={{ textDecoration: "none" }}>
                Add Candidate
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/import-candidate" style={{ textDecoration: "none" }}>
                Import Data
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/all-candidate" style={{ textDecoration: "none" }}>
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
