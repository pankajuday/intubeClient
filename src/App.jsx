import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoPlayerPage from "./page/VideoPlayerPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import Logout from "./components/Logout";
import History from "./components/History";
import LikedVideo from "./components/LikedVideo";
import Test from "./Test";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./page/VideoList";
import ErrorPage from "./Error/ErrorPage";
import UserProfile from "./components/userProfile";
import Playlist from "./components/Playlist";
import NotFound from "./Error/NotFound";
import NoInternetConnected from "./Error/NoInternetConnected";
import { useEffect, useState } from "react";
import ChannelProfile from "./components/ChannelProfile";

const MainLayout = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex w-full flex-col min-h-screen items-center">
      <div className="right-0">
        <Navbar />
      </div>
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-1">
        <main className=" sm:ml-64 p-6 flex relative">
          {isOnline ? <Outlet /> : <NoInternetConnected />}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<VideoList />} />
          <Route path="/video/:videoId" element={<VideoPlayerPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/likedvideos" element={<LikedVideo />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/not-found" element={<NotFound />}/>
          <Route path="/profile/:username" element={<ChannelProfile/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
