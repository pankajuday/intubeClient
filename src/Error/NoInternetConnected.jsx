import React, { useEffect, useState } from "react";
import nic from "../assets/noInternetConnection.png";
import { cacheImage } from "../utils/imageCache";
import CachedImage from "../components/CachedImage";

function NoInternetConnected() {
  const [isCaching, setIsCaching] = useState(true);

  useEffect(() => {
    const cacheNoInternetImage = async () => {
      try {
        console.log("Caching no internet connection image");
        await cacheImage("noInternet", nic);
      } catch (error) {
        console.warn("Failed to cache offline image:", error);
      } finally {
        setIsCaching(false);
      }
    };

    cacheNoInternetImage();
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="text-center p-4">
        <h2 className="text-xl font-bold mb-4">No Internet Connection</h2>

        <CachedImage
          src={nic}
          alt="No Internet Connection"
          cacheKey="noInternet"
          className="h-64 w-auto object-contain mb-6"
          onError={(e) => console.error("Failed to load image:", e)}
        />

        <p className="mb-4 text-gray-600">
          Please check your network connection and try again.
        </p>

        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default NoInternetConnected;
