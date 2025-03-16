import React from "react";
import nf from "../assets/404.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={nf} alt="" className="" />
      <div className="flex justify-around h-fit w-full">
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-sm shadow-md hover:bg-red-700 transition"
      >
        Go Home
      </button>
      <button
        onClick={() => window.location.reload()} // Go back to previous page
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-sm shadow-md hover:bg-blue-700 transition"
      >
        Refresh
      </button>
      </div>
    </div>
  );
}

export default NotFound;
