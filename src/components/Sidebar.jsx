import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  HomeIcon, 
  ClockIcon, 
  ThumbsUpIcon, 
  ListVideoIcon, 
  UsersIcon, 
  Settings,
  LogOutIcon
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { fetchUserDetail } from "../Redux/Slices/User";
import { fetchSubscribedChannels } from "../Redux/Slices/Subscription";
import { getRandomColor } from "@/lib/utils";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userDetail, isLoading } = useSelector((state) => state.user);
  const { subscribedChannels, subscriptionIsLoading, subscriptionError } = useSelector((state) => state.subscription);
  const [isOpen, setIsOpen] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");

  // Listen for toggle sidebar events from Navbar component
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsOpen(prev => !prev);
    };

    document.addEventListener('toggleSidebar', handleToggleSidebar);
    
    // Cleanup
    return () => {
      document.removeEventListener('toggleSidebar', handleToggleSidebar);
    };
  });

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only run this in mobile view
      if (window.innerWidth >= 768) return;
      
      // Check if click is outside sidebar
      if (isOpen && !e.target.closest('#sidebar') && !e.target.closest('[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    // Listen for clicks on the document
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Handle window resize - automatically open sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user details
  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  // Fetch subscribed channels when user detail is available
  useEffect(() => {
    if (userDetail?._id) {
      dispatch(fetchSubscribedChannels(userDetail?._id));
      setFallbackColor(getRandomColor());
      console.log("Fetching subscribed channels...");
    }
  }, [userDetail, dispatch]);

  const menuItems = [
    { icon: <HomeIcon size={20} />, text: "Home", to: "/" },
    { icon: <ClockIcon size={20} />, text: "History", to: "/history" },
    { icon: <ThumbsUpIcon size={20} />, text: "Liked Videos", to: "/likedvideos" },
    { icon: <ListVideoIcon size={20} />, text: "Playlists", to: "/playlists" },
  ];

  return (
    <>
      {/* Mobile Overlay - only visible when sidebar is open on mobile */}
      {isOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsOpen(false)} 
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`fixed left-0 top-16 bottom-0 z-40 w-64 bg-white shadow-lg transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:z-0 md:shadow-none overflow-y-auto`}
      >
        <div className="py-4 px-2 h-full flex flex-col">
          {/* Navigation Links */}
          <nav className="space-y-1 mb-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.text}
              </NavLink>
            ))}
          </nav>

          {/* Subscriptions Section */}
          <div className="mt-2 mb-2">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              SUBSCRIPTIONS
            </h3>
            
            <div className="mt-2 space-y-1 max-h-64 overflow-y-auto">
              {subscribedChannels && subscribedChannels.length > 0 ? (
                subscribedChannels.map((subscription) => (
                  <NavLink
                    key={subscription?._id}
                    to={`/profile/${subscription?.username}`}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <Avatar className="h-6 w-6 mr-3">
                      <AvatarImage src={subscription?.avatar} />
                      <AvatarFallback>
                        {subscription?.username?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{subscription?.fullName}</span>
                  </NavLink>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-500 italic">
                  No subscriptions yet
                </p>
              )}
            </div>
          </div>

          {/* Footer Section */}
          {userDetail && (
            <div className="mt-auto border-t border-gray-200 pt-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3">
                  <UsersIcon size={20} />
                </span>
                Your Channel
              </NavLink>
            </div>
          )}

          {userDetail && (
            <div className="border-t border-gray-200 mt-2">
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3">
                  <LogOutIcon size={20} />
                </span>
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
