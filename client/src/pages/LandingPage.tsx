import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "../img/about.jpg";

const LandingPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const navigate = useNavigate();
  const { connected } = useWallet();

  // Simulate page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Automatically navigate to profile page once wallet is connected
  useEffect(() => {
    if (connected) {
      navigate("/userprofile");
    }
  }, [connected, navigate]);

  const handleGetStartedClick = () => {
    if (!connected) {
      setShowWalletModal(true);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex items-center justify-center ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-16">
          {/* Logo */}
          <div className="text-white text-3xl font-bold">Earnify</div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 w-full">
          {/* Left Section - Text */}
          <div className="text-left md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold text-white">
              Accelerate your growth
            </h1>
            <h2 className="text-4xl font-bold text-gray-300">
              Share your Specialization with ease
            </h2>
            <button
              onClick={handleGetStartedClick}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Get Started {/* CTA Button */}
            </button>
            <p className="text-gray-400 text-md mt-4">
              Manage your entire product with on-chain tools
            </p>
          </div>

          {/* Right Section - Illustration or Placeholder */}
          <div className="hidden md:block md:w-1/2">
            <div className="w-full h-64 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-white text-2xl">
              <img src={Image} alt="image" />
            </div>
          </div>
        </div>

        {/* Wallet Connect Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full relative">
              <button
                onClick={() => setShowWalletModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="text-2xl font-semibold text-center mb-6">
                Connect Your Wallet
              </h3>
              <div className="flex justify-center">
                <WalletMultiButton className="!bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:!opacity-90 transition-opacity duration-200 !text-white !font-bold !px-6 !py-3 rounded-lg shadow-md" />
              </div>
              <button
                onClick={() => setShowWalletModal(false)}
                className="mt-6 text-gray-500 hover:text-gray-700 text-center block w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
