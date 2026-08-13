import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/authStore";
import AddCandidate from "../pages/AddCandidate";
import AllCandidate from "../pages/AllCandidate";
import LoginPage from "../pages/Login";
import CreateUser from "../pages/CreateUser";
import ResetPassword from "../pages/UpdatePassword";
import AllUsers from "../pages/AllUsers";
import RejectedCandidates from "../pages/RejectedCandidates";
import Loading from "../components/Loading";


const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Routes that should be accessible without authentication
const PUBLIC_ROUTES = ["/reset-password"];

const AppRoute = () => {
  const { user, login } = useLoginStore();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${VITE_API_URL}/auth/me`, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => login(data.user))
      .catch(() => console.log("Error at routes/approute"))
      .finally(() => setLoading(false));
  }, [login]);

  // Allow public routes (like reset-password) without authentication
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  // Show loader while session check is in progress — MUST come before user===null check
  if (loading && !isPublicRoute) return <Loading />;

  // If session check complete and still no user, show login
  if (!isPublicRoute && user === null) return <LoginPage />;

  return (
    <Routes>
      <Route path="/" element={user === null ? <LoginPage /> : <AllCandidate />} />
      <Route path="/add-candidate" element={<AddCandidate />}></Route>
      <Route path="/all-candidate" element={<AllCandidate />}></Route>
      <Route path="/create-user" element={<CreateUser />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/all-users" element={<AllUsers />}></Route>
      <Route
        path="/rejected-candidates"
        element={<RejectedCandidates />}
      ></Route>
    </Routes>
  );
};

export default AppRoute;
