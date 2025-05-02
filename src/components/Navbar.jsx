import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BellIcon, MenuIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "@/Redux";
import { useEffect, useState } from "react";
import { getRandomColor } from "@/lib/utils";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetail());
    dispatch(fetchUserDetail());
    setFallbackColor(getRandomColor());
  }, [dispatch]);
  

  const handleToggleSidebar = () => {
    // Use a custom event to communicate with the Sidebar component
    const event = new CustomEvent('toggleSidebar');
    document.dispatchEvent(event);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/videos?query=${searchTerm}`);
      setSearchTerm("");
      setShowMobileSearch(false);
    }
  };

  // Handle mobile search toggle
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-4">
      {/* Left Section: Logo and sidebar toggle */}
      <div className="flex items-center">
        {/* Mobile menu toggle button */}
        <button 
          className="mr-3 p-2 rounded-full hover:bg-gray-100 sm:hidden" 
          onClick={handleToggleSidebar}
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Logo - hidden when mobile search is active */}
        <Link to="/" className={`flex items-center ${showMobileSearch ? 'hidden sm:flex' : ''} hidden md:block `}>
          <img src={logo} alt="Pin Tube Logo" className="h-8 w-auto " />
        </Link>
      </div>

      {/* Center Section: Search (responsive) */}
      <div className={`flex-1 max-w-2xl mx-4 ${showMobileSearch ? 'flex' : 'hidden sm:flex'}`}>
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100"
          >
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </button>
        </form>
      </div>

      {/* Right Section: Actions and Profile (conditionally rendered) */}
      <div className="flex items-center space-x-2">
        {/* Mobile search toggle button - visible only on mobile when search is not active */}
        <button
          className={`p-2 rounded-full hover:bg-gray-100 sm:hidden ${showMobileSearch ? 'hidden' : ''}`}
          onClick={toggleMobileSearch}
          aria-label="Search"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
        
        {/* Close search button - only on mobile when search is active */}
        {showMobileSearch && (
          <button
            className="p-2 rounded-full hover:bg-gray-100 sm:hidden"
            onClick={toggleMobileSearch}
            aria-label="Close search"
          >
            <span className="text-xl font-bold">&times;</span>
          </button>
        )}

        {/* Create button - hidden on mobile when search is active */}
        <Link 
          to="/publish-video"
          className={`${showMobileSearch ? 'hidden sm:flex' : ''}`}
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </Link>

        {/* Notifications - hidden on mobile when search is active */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full ${showMobileSearch ? 'hidden sm:flex' : ''}`}
        >
          <div className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </div>
        </Button>

        {/* Profile - hidden on mobile when search is active */}
        <div className={`${showMobileSearch ? 'hidden sm:block' : ''}`}>
          {userDetail ? (
            <Link to="/profile">
              <Avatar>
                <AvatarImage src={userDetail?.avatar} alt={userDetail?.fullName} />
                
                <AvatarFallback className={`${fallbackColor} text-white`}>
                    {userDetail?.fullName?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
