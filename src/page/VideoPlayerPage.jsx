import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "@/components/VideoPlayer";


const VideoPlayerPage = () => {
  const [loading, setLoading]  = useState(false)
  const [liked, setLiked] = useState(false);
  const {videoId} = useParams();
  const dispatch = useDispatch()
  const {likeData, isLoading, error} = useSelector((state)=>state.like);


  // useEffect( () => {

  // let isMounted = true;


  //   const isLikedOnVideo =  () => {
  //     try {
        
  //     } catch (error) {
  //       if (isMounted) {
  //         console.error("Error fetching Likes details:", error);
  //       }
  //     }
  //   };

  //   // fetchVideoDetails();
  //   isLikedOnVideo();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [dispatch, videoId]);



  const handleLikeToggle = useCallback(async () => {
    setLiked(prevLiked => !prevLiked);
    try {
      await likesToggle(videoId);
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(prevLiked => !prevLiked); // Revert the like state if the API call fails
    }
  }, []);

  return (
    <div className="sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px]  mx-auto">
      {/* Video Player Section */}
      <div className="relative ">
        {loading ? (
          <Skeleton height="100%" className="m-0 relative sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px] "/>
        ) : (
          
            <VideoPlayer />
        )}
      </div>

      {/* Video Info Section */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <>
            <Skeleton width={480} height={32} />
            <Skeleton width={360} height={24} />
            <Skeleton count={3} />
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Comments Section (Optional) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {/* Add comments implementation here */}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
