import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/authStore";
import AddCandidate from "../pages/AddCandidate";
import AllCandidate from "../pages/AllCandidate";
import LoginPage from "../pages/Login";
import CreateUser from "../pages/CreateUser";
import ResetPassword from "../pages/UpdatePassword";
import UpdatePassword from "../pages/UpdatePassword";
import AllUsers from "../pages/AllUsers";
import RejectedCandidates from "../pages/RejectedCandidates";
import Loading from "../components/Loading";


const VITE_API_URL = import.meta.env.VITE_API_URL
const AppRoute = () => {
  const { user, login } = useLoginStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${VITE_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => login(data.user))
      .catch(() => console.log("Error at routes/approute"))
      .finally(() => setLoading(false));
  }, [login]);

  if (user === null) return <LoginPage />


  if (loading) return <Loading />
  return (
    <Routes>
      <Route path="/" element={user === null ? <LoginPage /> : <AllCandidate />} />
      <Route path="/add-candidate" element={<AddCandidate />}></Route>
      <Route path="/all-candidate" element={<AllCandidate />}></Route>
      <Route path="/create-user" element={<CreateUser />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/update-password" element={<UpdatePassword />}></Route>
      <Route path="/all-users" element={<AllUsers />}></Route>
      <Route
        path="/rejected-candidates"
        element={<RejectedCandidates />}
      ></Route>
    </Routes>
  );
};

export default AppRoute;
