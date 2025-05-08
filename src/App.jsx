import React from 'react';
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
import PublishVideo from "./components/PublishVideo";
import CookiePermission from './components/Permission/CookiePermission';
import ShareCard from './components/ShareCard';
import SpringLoader from './components/SpringLoader';
import VideoCommentCard from './components/VideoCommentCard';
import VideoComments from './components/VideoComments';
import PlaylistCreate from './components/PlaylistCreate';
import PlaylistVideo from './components/PlaylistVideo';
import HealthCheck from './components/HealthCheck';
import { ToastContainer } from './Notification/Toast';

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 "> {/* Add padding for navbar */}
        <Sidebar />
        <main className="w-full pl-0 sm:pl-64 py-4 px-0 md:px-6 transition-all duration-300 justify-center ">
          {isOnline ? <Outlet /> : <NoInternetConnected />}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      {/* CookiePermission component can be uncommented when needed */}
      <CookiePermission />
      
      {/* Toast container for application-wide notifications */}
      <ToastContainer />
      
      <div className="App">
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
              <Route path="/publish-video" element={<PublishVideo />} />
              <Route path='/plylist/:playlistId' element={<PlaylistVideo/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/test' element={<PlaylistVideo />}/>
            <Route path='/healthcheck' element={<HealthCheck />}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
