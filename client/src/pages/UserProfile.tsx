import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useNavigate,
  Link,
  useParams,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBookmark,
  FaUser,
  FaBars,
  FaClock,
  FaStar,
  FaCode,
  FaChartLine,
  FaLaptopCode,
  FaRocket,
  FaBook,
  FaBrain,
} from "react-icons/fa";
import "./UserProfile.css";

// Sample course data
export const courses = [
  {
    id: 1,
    imgSrc: "https://via.placeholder.com/300",
    title: "Building on Solana",
    time: "3h 20m",
    rating: "4.5",
    price: 100,
    category: "Development",
    description: "This course teaches you how to build on Solana",
  },
  {
    id: 2,
    imgSrc: "https://via.placeholder.com/300",
    title: "Solana for Dummies",
    time: "2h 15m",
    rating: "4.0",
    price: 80,
    category: "Education",
    description: "This course is for beginners who want to learn about Solana",
  },
  {
    id: 3,
    imgSrc: "https://via.placeholder.com/300",
    title: "New Stuff",
    time: "4h 5m",
    rating: "4.8",
    price: 120,
    category: "Rocket Science",
    description: "This course teaches you about new stuff in Solana",
  },
  {
    id: 4,
    imgSrc: "https://via.placeholder.com/300",
    title: "Random Stuff",
    time: "5h 30m",
    rating: "4.2",
    price: 90,
    category: "Innovation",
    description: "This course is about random stuff in Solana",
  },
];

// Sample categories data
const categories = [
  { name: "Development", icon: <FaCode size={24} /> },
  { name: "Finance", icon: <FaChartLine size={24} /> },
  { name: "Education", icon: <FaBook size={24} /> },
  { name: "Innovation", icon: <FaBrain size={24} /> },
  { name: "Rocket Science", icon: <FaRocket size={24} /> },
  { name: "Technology", icon: <FaLaptopCode size={24} /> },
];

const USDC_SYMBOL_URL = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"; // Replace with actual URL

const UserProfile: React.FC = () => {
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [savedCourses, setSavedCourses] = useState<number[]>([]); // State to store saved courses
  const [bloomActive, setBloomActive] = useState<number | null>(null); // State to manage bloom animation

  useEffect(() => {
    if (!publicKey) {
      navigate("/");
    }
  }, [publicKey, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(null); // Trigger fade-out
    setTimeout(() => {
      setSelectedCategory(category); // Trigger fade-in after delay
    }, 300);
  };

  // Handles bookmark click
  const handleBookmarkClick = (courseId: number) => {
    setSavedCourses(
      (prevSaved) =>
        prevSaved.includes(courseId)
          ? prevSaved.filter((id) => id !== courseId) // Remove if already saved
          : [...prevSaved, courseId] // Add to saved if not yet
    );
    // Activate bloom animation for a specific course
    setBloomActive(courseId);
    // Remove the animation after a short duration
    setTimeout(() => {
      setBloomActive(null);
    }, 300);
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
        <Link
          to="/"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center mb-8"
        >
          <FaHome size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Home</span>}
        </Link>
        <Link
          to="/search"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center mb-8"
        >
          <FaSearch size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Search</span>}
        </Link>
        <Link
          to="/saved"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center mb-8"
        >
          <FaBookmark size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Saved</span>}
        </Link>
        <Link
          to="/profilepage"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
        >
          <FaUser size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Profile</span>}
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <WalletMultiButton className="text-white" />
        </header>

        {/* Categories Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-light-blue-600 text-light-blue-300"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="mb-2 text-gray-400">{category.icon}</div>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${selectedCategory === category.name ? "text-light-blue-300" : "text-white"}`}
                >
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses
            .filter((course) =>
              selectedCategory ? course.category === selectedCategory : true
            )
            .map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <div className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col">
                  <div className="relative mb-4">
                    <img
                      src={course.imgSrc}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <FaBookmark
                      size={18}
                      onClick={() => handleBookmarkClick(course.id)}
                      className={`absolute top-2 left-2 cursor-pointer text-white p-1 rounded-full ${
                        savedCourses.includes(course.id)
                          ? "bg-yellow-500"
                          : "bg-gray-800"
                      } ${bloomActive === course.id ? "bloom" : ""}`} // Apply bloom animation
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
                  <p className="text-sm font-bold flex items-center space-x-1">
                    <img src={USDC_SYMBOL_URL} alt="USDC" className="w-4 h-4" />
                    <span>{course.price} USDC</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
