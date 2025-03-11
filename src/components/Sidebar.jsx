import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import {
  Home,
  LayoutDashboard,
  Clock,
  ThumbsUp,
  Library,
  Users,
  Tv,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    // { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    // { name: "Subscriptions", icon: Tv, path: "/subscriptions" },
    { name: "History", icon: Clock, path: "/history" },
    { name: "Liked Videos", icon: ThumbsUp, path: "/likedvideos" },
    { name: "Playlists", icon: Library, path: "/playlists" },
  ];

  const subscriptions = [
    { name: "Tech Channel", icon: Users },
    { name: "Cooking Show", icon: Users },
    { name: "Gaming Hub", icon: Users },
  ];

  return (
    <div className="w-64 fixed left-0 top-0 h-full bg-white shadow-lg z-50  items-center hidden sm:block">
      {/* Logo Section */}

      <div className="flex items-center space-x-4 justify-center ">
        <Link to="/" className="flex items-center space-x-2">
          {/* Replace with your logo */}
          {/* <svg
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
          </svg> */}

          <img src={logo} alt="" className="h-20 w-36"/>
          <span className="text-xl font-bold text-gray-900">InTube</span>
        </Link>
      </div>

      {/* Main Menu */}
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 ${
                  isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Subscriptions Section */}
        <div className="mt-6 pt-4 border-t">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase mb-2">
            Subscriptions
          </h3>
          <div className="space-y-1">
            {subscriptions.map((channel) => (
              <button
                key={channel.name}
                className="flex items-center space-x-3 p-2 w-full rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <channel.icon className="h-5 w-5" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
