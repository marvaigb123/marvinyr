import React from "react";
import { FaStar, FaClock, FaBookmark } from "react-icons/fa";

// Define Course type here or import it
interface Course {
  id: number;
  imgSrc: string;
  title: string;
  time: string;
  rating: string;
  price: number;
  category: string;
}

interface SavedCoursesPageProps {
  savedCourses: Course[]; // Ensure this is correctly typed
}

const USDC_SYMBOL_URL = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"; // Replace with actual URL

const SavedCoursesPage: React.FC<SavedCoursesPageProps> = ({
  savedCourses,
}) => {
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Saved Courses</h1>
      {savedCourses.length === 0 ? (
        <p className="text-xl text-gray-400">No courses saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col"
            >
              <div className="relative mb-4">
                <img
                  src={course.imgSrc}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <FaBookmark
                  size={18}
                  className={`absolute top-2 left-2 text-yellow-500 bg-gray-800 p-1 rounded-full`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCoursesPage;
