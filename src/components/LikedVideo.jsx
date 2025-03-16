import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { likedVideo } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { likedVideoSlice } from "@/Redux";
import { useParams } from "react-router-dom";
import SpringLoader from "./SpringLoader";

const LikedVideo = () => {
  // const [videos, setVideos] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { likeData, isLoading, error } = useSelector((state) => state.like);
  const { videoId } = useParams();

  useEffect(() => {

    let isMounted = true;
    const fetchLikedVideo = async () => {
      try {
        if (isMounted) {
          dispatch(likedVideoSlice(videoId));
        }
      } catch (error) {
        if (isMounted) {
          return error.message;
        }
      }
    };

    fetchLikedVideo();
    return () => {

      isMounted = !isMounted;
    };
  }, []);



  return (
    <div className="video-container relative">
      {/* Video Grid */}
      <h1 className="sm:xl:text-4xl font-bold h-auto w-full border-b-2 border-gray-500 pb-3 mb-3 ">Your Liked Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
        {isLoading
          ? Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow flex  flex-col items-center"
                >
                  <Skeleton height={200} width={300} />
                  <div className="p-3">
                    <Skeleton width={300} />
                    <div className="flex items-center justify-around">
                      <Skeleton width={30} height={30} circle />
                      <Skeleton width={250} />
                    </div>
                    <Skeleton width={300} />
                  </div>
                </div>
              ))
          : Array.isArray(likeData.data) &&
          likeData.data.map((video) => video === undefined || video === null ?"" : <VideoCard key={video?._id} video={video} />)}
      </div>
    </div>
  );
};

export default LikedVideo;
