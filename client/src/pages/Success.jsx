import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Success = () => {
  const celebrate = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg p-20 shadow-md text-center">
        <h1 className="text-4xl font-bold text-[#2BA3C6] mb-8">
          Congratulations!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment has been successfully accepted!
        </p>
        <button
          onClick={celebrate}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none transition duration-300">
          Celebrate 🎉
        </button>
      </div>
    </div>
  );
};

export default Success;
