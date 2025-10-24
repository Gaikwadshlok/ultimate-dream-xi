import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    setShowLogoutAlert(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-black via-slate-900 to-black text-white py-4 px-6 shadow-md border-b border-green-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo / Brand */}
          <div className="text-3xl font-extrabold tracking-wide text-green-400 flex items-center gap-2">
            <span role="img" aria-label="football">⚽</span> Ultimate Dream XI
          </div>

          {/* Nav Links */}
          <div className="flex gap-6 text-lg font-medium">
            <NavItem to="/" label="Home" active={location.pathname === "/"} />
            <NavItem to="/team-builder" label="Create Team" active={location.pathname === "/team-builder"} />
            <NavItem to="/my-team" label="My Team" active={location.pathname === "/my-team"} />
            <NavItem to="/battle" label="Battle" active={location.pathname === "/battle"} />
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-yellow-400 transition duration-300 font-bold"
            >
              Log-out
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Alert */}
      {showLogoutAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-white text-lg mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-300 hover:text-white transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-300"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Fancy link component with underline animation
const NavItem = ({ to, label, active }) => {
  return (
    <Link
      to={to}
      className={`relative group transition duration-200 ${
        active ? "text-green-400" : "text-white"
      } hover:text-green-400`}
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

export default Navbar;
