import React from "react";
import nic from "../assets/noInternetConnection.png";

function NoInternetConnected() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={nic} alt="" className="h-96 w-96" />
      <button
        onClick={handleRefresh}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
}

export default NoInternetConnected;
