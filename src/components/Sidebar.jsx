import { Link, NavLink } from "react-router-dom";
import "../App.css"
import logo from "../assets/logo.png";
import {
  Home,
  LayoutDashboard,
  Clock,
  ThumbsUp,
  Library,
  Users,
  Tv,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelSubscribers,
  fetchSubscribedChannels,
  fetchUserDetail,
} from "@/Redux";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SpringLoader from "./SpringLoader";

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Sidebar = () => {
  const [fallbackColor, setFallbackColor] = useState("");

  const dispatch = useDispatch();
  const { subscribedChannels, subscriptionIsLoading, subscriptionError } =
    useSelector((state) => state.subscription);
  const { userDetail, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  useEffect(() => {
    if (userDetail?._id ) {
      dispatch(fetchSubscribedChannels(userDetail?._id));
      setFallbackColor(getRandomColor());
      console.log("Fetching subscribed channels...");
    }
  }, [ userDetail, dispatch]);




  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    // { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    // { name: "Subscriptions", icon: Tv, path: "/subscriptions" },
    { name: "History", icon: Clock, path: "/history" },
    { name: "Liked Videos", icon: ThumbsUp, path: "/likedvideos" },
    { name: "Playlists", icon: Library, path: "/playlists" },
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

          <img src={logo} alt="" className="h-10 w-40 m-2" />
          {/* <span className="text-xl font-bold text-gray-900">InTube</span> */}
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
          <div className="space-y-1 h-96 w-full  overflow-y-scroll relative scrollbar-custom">
            {subscriptionIsLoading  ? (
              <SpringLoader />
            ): subscribedChannels?.length === 0 ? (
              <p className="text-gray-500 text-sm text-center mt-4">
                You haven't subscribed to any channels yet.
              </p>
            )  : (
              subscribedChannels?.map((channel) => (
                <NavLink key={channel?._id} to={`/profile/${channel?.username}`}>
                  <button className="flex items-center space-x-3 p-2 w-full rounded-lg hover:bg-gray-100 text-gray-700 ">
                    <Avatar>
                      <AvatarImage src={channel?.avatar} />
                      <AvatarFallback
                        className={`${fallbackColor} text-white text-3xl text-center font-bold`}
                      >
                        {channel?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-sm font-bold">
                      {channel?.fullName}
                    </span>
                  </button>
                </NavLink>
                
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
