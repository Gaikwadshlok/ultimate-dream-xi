// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
      <FaTrophy className="text-yellow-400 text-8xl mb-6" />
      <h1 className="text-7xl font-bold mb-4">Ultimate Dream XI</h1>
      <p className="text-2xl mb-8 whitespace-nowrap overflow-hidden text-ellipsis">Build your legendary football squad, battle AI coaches, and dominate the Ultimate Champions League.</p>

      {/* 👇 Create Squad Button using <Link> */}
      <Link
        to="/login"
        className="bg-yellow-400 hover:bg-yellow-500 text-black text-2xl font-semibold py-3 px-8 rounded-full transition duration-300"
      >
        Create My Squad
      </Link>

      {/* Optional: Login/Register links */}
      <div className="mt-8 space-x-6 text-lg text-gray-300">
        <Link to="/login" className="hover:text-yellow-400">
          Login
        </Link>
        <span>|</span>
        <Link to="/register" className="hover:text-yellow-400">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
