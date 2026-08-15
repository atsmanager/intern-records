import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/authStore";
import AddCandidate from "../pages/AddCandidate";
import ImportCandidate from "../pages/ImportCandidate";
import AllCandidate from "../pages/AllCandidate";
import LoginPage from "../pages/Login";
import CreateUser from "../pages/CreateUser";
import ResetPassword from "../pages/UpdatePassword";
import AllUsers from "../pages/AllUsers";
import RejectedCandidates from "../pages/RejectedCandidates";
import Pricing from "../pages/Pricing";
import Checkout from "../pages/Checkout";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import RefundPolicy from "../pages/RefundPolicy";
import TermsConditions from "../pages/TermsConditions";
import SupportCenter from "../pages/SupportCenter";
import CreateTicket from "../pages/CreateTicket";
import Profile from "../pages/Profile";
import PaymentSuccess from "../pages/PaymentSuccess";
import Loading from "../components/Loading";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Routes that should be accessible without authentication
const PUBLIC_ROUTES = [
  "/reset-password", 
  "/update-password", 
  "/pricing", 
  "/checkout", 
  "/privacy-policy", 
  "/refund-policy", 
  "/terms",
  "/support",
  "/create-ticket",
  "/payment-success"
];

const AppRoute = () => {
  const { user, login } = useLoginStore();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }
    
    fetch(`${VITE_API_URL}/auth/me`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => login(data.user))
      .catch((e) => console.log("Session check failed:", e.message))
      .finally(() => setLoading(false));
  }, [login]);

  // Allow public routes (like reset-password) without authentication
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  // Show loader while session check is in progress — MUST come before user===null check
  if (loading && !isPublicRoute) return <Loading />;

  // If session check complete and still no user, show login
  if (!isPublicRoute && user === null) return <LoginPage />;

  const isExpired = user && user.role !== 'superadmin' && user.validityDate && new Date(user.validityDate) < new Date();
  
  if (isExpired && !isPublicRoute && location.pathname !== '/profile') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 180px)', background: '#000', padding: '20px' }}>
        <div style={{ background: '#0d0d12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '40px', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Subscription Expired</h2>
          <p style={{ color: '#a0a0b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            Your validity is expired, repurchase our plans for Continue using the Website.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/pricing" style={{ background: 'linear-gradient(135deg, #4f8ef7, #a855f7)', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700' }}>View Plans</Link>
            <Link to="/profile" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>My Profile</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user === null ? <LoginPage /> : <AllCandidate />} />
      <Route path="/add-candidate" element={<AddCandidate />}></Route>
      <Route path="/import-candidate" element={<ImportCandidate />}></Route>
      <Route path="/all-candidate" element={<AllCandidate />}></Route>
      <Route path="/create-user" element={<CreateUser />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/update-password" element={<ResetPassword />}></Route>
      <Route path="/pricing" element={<Pricing />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
      <Route path="/refund-policy" element={<RefundPolicy />}></Route>
      <Route path="/terms" element={<TermsConditions />}></Route>
      <Route path="/support" element={<SupportCenter />}></Route>
      <Route path="/create-ticket" element={<CreateTicket />}></Route>
      <Route path="/payment-success" element={<PaymentSuccess />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/all-users" element={<AllUsers />}></Route>
      <Route
        path="/rejected-candidates"
        element={<RejectedCandidates />}
      ></Route>
    </Routes>
  );
};

export default AppRoute;
