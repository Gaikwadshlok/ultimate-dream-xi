import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext"; // 👈 Correct hook

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        localStorage.setItem("token", data.token);
        navigate("/team-builder");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900/50 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>

        {/* New Account Link */}
        <Link
          to="/register"
          className="block mt-4 text-center text-gray-400 hover:text-yellow-400 transition duration-300"
        >
          New Account? Register
        </Link>
      </form>
    </div>
  );
};

<div className="min-h-screen bg-black bg-opacity-70 backdrop-blur-md text-white p-6">
  {/* Your page content */}
</div>

export default Login;
