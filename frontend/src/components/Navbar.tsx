import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/authStore";
import Logo from "../assets/Logo.jpeg";
const Navbar = () => {
  const { user, logout } = useLoginStore();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <nav className="flex w-full justify-between px-3 py-3 lg:px-10 bg-white shadow-md items-center">
      <div>
        <img
          src={Logo}
          alt="logo"
          className=" h-18"
        />
      </div >
      <ul className="flex gap-1 text-sm lg:text-lg items-center font-medium lg:gap-4">
        {user && user.role === 'superadmin' && <Link to="/all-users">
          <li className="text-gray-600 hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg">
            All users
          </li>
        </Link>}
        {user && <Link to="/add-candidate">
          <li className="text-cyan-600 hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg">
            Add Candidate
          </li>
        </Link>}

        {user && <Link to="all-candidate">
          <li className="text-cyan-600 hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg">
            All Candidate
          </li>
        </Link>}

        {user && <li className="text-white hover:cursor-pointer hover:text-cyan-500 hover:shodow-lg bg-blue-500 rounded-xl p-3"
          onClick={handleLogout}
        >Logout</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
