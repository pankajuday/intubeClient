import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "@/components/VideoPlayer";

const VideoPlayerPage = () => {
  // const [loading, setLoading] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const { videoId } = useParams();
  // const dispatch = useDispatch();
 
  // const { selectedVideo, loading:videoLoading, error:videoError } = useSelector((state) => state.video);





  return (
    <div className="relative  sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px] ">
      {/* Video Player Section */}
      <VideoPlayer />

      

      {/* Comments Section (Optional) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {/* Add comments implementation here */}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
