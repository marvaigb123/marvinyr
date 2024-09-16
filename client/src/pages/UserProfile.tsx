// src/pages/UserProfile.tsx
import React, { useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBookmark,
  FaUser,
  FaBars,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample course data
const courses = [
  {
    imgSrc: "https://via.placeholder.com/300",
    title: "Building on Solana",
    time: "3h 20m",
    rating: "4.5",
    price: 100,
  },
  {
    imgSrc: "https://via.placeholder.com/300",
    title: "Solana for Dummies",
    time: "2h 15m",
    rating: "4.0",
    price: 80,
  },
  {
    imgSrc: "https://via.placeholder.com/300",
    title: "New Stuff",
    time: "4h 5m",
    rating: "4.8",
    price: 120,
  },
  {
    imgSrc: "https://via.placeholder.com/300",
    title: "Random Stuff",
    time: "5h 30m",
    rating: "4.2",
    price: 90,
  },
];

const USDC_SYMBOL_URL = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"; // Replace with actual URL

const UserProfile: React.FC = () => {
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!publicKey) {
      navigate("/");
    }
  }, [publicKey, navigate]);

  const handleDisconnect = async () => {
    await disconnect();
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 ${sidebarOpen ? "w-24" : "w-16"} transition-all duration-300 p-4 flex flex-col items-center`}
      >
        <button
          onClick={toggleSidebar}
          className="mb-8 text-gray-400 hover:text-light-blue-500 transition-colors duration-300"
        >
          <FaBars size={24} />
        </button>
        <div className="flex flex-col items-center mb-8">
          <Link
            to="/"
            className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
          >
            <FaHome size={20} />
            {sidebarOpen && <span className="text-xs mt-1">Home</span>}
          </Link>
        </div>
        <div className="flex flex-col items-center mb-8">
          <Link
            to="/search"
            className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
          >
            <FaSearch size={20} />
            {sidebarOpen && <span className="text-xs mt-1">Search</span>}
          </Link>
        </div>
        <div className="flex flex-col items-center mb-8">
          <Link
            to="/courses"
            className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
          >
            <FaBookmark size={20} />
            {sidebarOpen && <span className="text-xs mt-1">Courses</span>}
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/profile"
            className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
          >
            <FaUser size={20} />
            {sidebarOpen && <span className="text-xs mt-1">Profile</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Featured Courses</h1>
          <div className="flex items-center space-x-4">
            <WalletMultiButton />
            {/* <button
              onClick={handleDisconnect}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              Disconnect
            </button> */}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Course Cards */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col"
            >
              <div className="relative mb-4">
                <img
                  src={course.imgSrc}
                  alt={`Course ${index}`}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <FaBookmark
                  size={18}
                  className="absolute top-2 left-2 text-white bg-gray-800 p-1 rounded-full"
                />
              </div>
              <p className="text-sm font-semibold mb-2">{course.title}</p>
              <div className="flex justify-between text-gray-400 mb-2">
                <div className="flex items-center space-x-2">
                  <FaStar size={14} />
                  <span className="text-xs">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock size={14} />
                  <span className="text-xs">{course.time}</span>
                </div>
              </div>
              <p className="text-sm font-bold text-cyan-400 flex items-center space-x-1">
                <img
                  src={USDC_SYMBOL_URL}
                  alt="USDC Symbol"
                  className="w-4 h-4"
                />
                <span>{course.price}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
