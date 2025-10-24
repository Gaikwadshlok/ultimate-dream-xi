import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/50 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Register
        </button>

        {/* Already Registered Link */}
        <Link
          to="/login"
          className="block mt-4 text-center text-gray-400 hover:text-yellow-400 transition duration-300"
        >
          Already Registered? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
