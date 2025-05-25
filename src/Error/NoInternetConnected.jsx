import React, { useEffect } from "react";
import nic from "../assets/noInternetConnection.png";
import { getCachedImage, cacheImage } from "../utils/imageCache";
import CachedImage from "../components/CachedImage";

function NoInternetConnected() {
  useEffect(()=>{
    const cacheNoInternetImage = async()=>{
      try {
        await cacheImage("noInternet",nic)
      } catch (error) {
        console.warn('Failed to cache offline image:', error);
      }
    }
    cacheNoInternetImage();
  }, []);
  const handleRefresh = () => {
    
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center flex-col ">
      <CachedImage
      src={nic}
      alt="No Internet Connection"
      cacheKey = "noInternet"
      className="h-64 w-auto object-contain mb-6"
      />
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
