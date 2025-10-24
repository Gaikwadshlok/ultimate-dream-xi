// src/components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
        🏆 Ultimate Dream XI
      </h1>
      <p className="mt-4 max-w-xl text-lg sm:text-xl text-gray-300">
        Build your legendary football squad, battle AI coaches, and dominate the Ultimate Champions League.
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate('/team-builder')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Create My Squad
        </button>
      </div>
    </section>
  );
}

export default Hero;
