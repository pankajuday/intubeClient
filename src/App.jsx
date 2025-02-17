import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoList from "./components/VideoList";
import VideoPlayerPage from "./components/VideoPlayerPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import Logout from "./components/Logout";
import History from "./components/History";

const MainLayout = () => {
  return (
    <div className="flex w-full  flex-col min-h-screen  items-center">
      <div className="border-2 border-red-900 right-0">
        <Navbar />
        </div>
      <div className="">
        <Sidebar />
      </div>

      <div className="flex flex-1">
        <main className="flex-1 ml-64 p-6  flex relative ">
          <Outlet />
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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
