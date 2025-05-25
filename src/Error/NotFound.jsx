import React from "react";
import nf from "../assets/404.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col items-center justify-center text-center max-w-md px-4">
        <img src={nf} alt="404 Not Found" className="w-full max-w-sm mx-auto" />
        <h2 className="text-2xl font-bold mt-4 mb-2">Not Found</h2>
        <p className="text-gray-600 mb-6">The content you are looking for doesn't exist.</p>
        <div className="flex flex-wrap justify-center gap-4 w-full mt-2">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 transition"
          >
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;