import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { FaHome, FaSearch, FaBookmark, FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { publicKey } = useWallet();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex">
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
          to="/courses"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center mb-8"
        >
          <FaBookmark size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Courses</span>}
        </Link>
        <Link
          to="/profile"
          className="text-gray-400 hover:text-light-blue-500 transition-colors duration-300 flex flex-col items-center"
        >
          <FaUser size={20} />
          {sidebarOpen && <span className="text-xs mt-1">Profile</span>}
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-8 space-y-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <WalletMultiButton className="text-white" />
        </header>

        <div className="flex gap-8">
          {/* Profile Information & Achievements */}
          <div className="w-3/5 space-y-8">
            {/* Profile Information */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                {/* Profile Image */}
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="rounded-full w-24 h-24 mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold">Sally Robins</h2>
                  <p className="text-gray-400">New York</p>
                </div>
              </div>

              {/* Total Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-lg font-bold">3</p>
                  <p className="text-gray-400">Finished Courses</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-lg font-bold">56</p>
                  <p className="text-gray-400">Hours Learned</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-lg font-bold">7</p>
                  <p className="text-gray-400">Skills Achieved</p>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <section className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Achievements</h2>

              <div className="bg-gray-700 p-6 rounded-lg shadow-lg animate-pulse">
                <div className="flex items-center justify-center h-40">
                  <p className="text-xl font-bold text-white">Coming Soon</p>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-lg animate-pulse">
                <div className="flex items-center justify-center h-40">
                  <p className="text-xl font-bold text-white">Coming Soon</p>
                </div>
              </div>
            </section>
          </div>

          {/* Referal & Invite Friends Section */}
          <div className="w-2/5 space-y-8">
            {/* Referal List */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Referals</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Friend"
                      className="rounded-full w-12 h-12 mr-4"
                    />
                    <p className="font-bold">William Walker</p>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-1 px-3 rounded-md text-sm shadow-lg transition-transform transform hover:scale-105">
                    View Profile
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Friend"
                      className="rounded-full w-12 h-12 mr-4"
                    />
                    <p className="font-bold">Anna Clarke</p>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-1 px-3 rounded-md text-sm shadow-lg transition-transform transform hover:scale-105">
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Invite Friends Button */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                Invite Friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
