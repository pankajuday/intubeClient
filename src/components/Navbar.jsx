import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Video, Bell, User } from "lucide-react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed top-0 w-[84%] bg-white shadow-sm z-50  right-0">
      {/* <div className=" h-10 w-full bg-slate-950 text-cyan-500 z-50 text-center items-center justify-center">
      🔧 This site is currently under development. Some features may not work as expected. Stay tuned for updates! 🚀
      </div> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Menu */}
          {/* <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              Replace with your logo
              <svg
                className="h-14 w-14 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="16" x="0" y="4" rx="4" fill="red" />
                <text
                  x="12"
                  y="14"
                  font-size="5"
                  font-weight="bold"
                  fill="white"
                  text-anchor="middle"
                  font-family="Arial"
                >
                  InTube
                </text>
              </svg>

              <span className="text-xl font-bold text-gray-900">InTube</span>
            </Link>
          </div> */}

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Section - Actions and Profile */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Plus className="h-6 w-6 text-gray-700" />
            </button>

            {/* <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="h-6 w-6 text-gray-700" />
            </button> */}

            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0
                {/* TODO : WRITE HERE CODE FOR CALCULATE AND SHOW NOTIFICATION ON NOTIFICATION BUTTON ON NAVIGATION BAR */}
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full"
              >
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-xl py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  {/* <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link> */}
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
