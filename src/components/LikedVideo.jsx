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
      isMounted = false;
    };
  }, []);

  return (
    <div className="video-container relative w-full">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold h-auto w-full border-b-2 border-gray-500 pb-3 mb-6">Your Liked Videos</h1>

      {/* Video list */}
      <div className="flex flex-wrap  gap-4">
        {isLoading
          ? Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow w-full max-w-sm mb-4 p-3"
                >
                  <Skeleton height={200} width="100%" />
                  <div className="mt-3">
                    <Skeleton width="100%" />
                    <div className="flex items-center gap-2 my-2">
                      <Skeleton width={30} height={30} circle />
                      <Skeleton width="calc(100% - 40px)" />
                    </div>
                    <Skeleton width="100%" />
                  </div>
                </div>
              ))
          : Array.isArray(likeData.data) &&
            likeData.data.map((video) => (
              video === undefined || video === null 
              ? null 
              : (
                <div key={video?._id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)]">
                  <VideoCard video={video} />
                </div>
              )
            ))}
      </div>
    </div>
  );
};

export default LikedVideo;
