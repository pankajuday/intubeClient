import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardContent, Card, CardTitle } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { formatDate,getTimeAgo } from "@/utils/formateDate";
import { getRandomColor } from "@/utils/getRandomColor";
import { Dot, MoreHorizontal, MoreVertical, Share2 } from "lucide-react";
import { Button } from "./ui/button";


const VideoCard = ({ video }) => {
  const [fallbackColor, setFallbackColor] = useState("");
  const [toggleMoreOpt, setToggleMoreOpt] = useState(false)

  useEffect(() => {
    setFallbackColor(getRandomColor()); 
  }, []);


  // Format duration for display
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <Card className="w-full h-full rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105">
      <Link to={`/video/${video?._id}`} className="block">
        {/* Video thumbnail */}
        <AspectRatio ratio={16 / 9} className="w-full bg-slate-700">
          <img
            src={video?.thumbnail}
            alt={video?.title}
            className="rounded-sm object-cover w-full h-full"
          />
          {/* Video duration */}
          {video?.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video?.duration)}
            </span>
          )}
        </AspectRatio>
        </Link>
        <CardContent className="flex gap-3 p-2">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={video?.avatar} />
            <AvatarFallback className={`${fallbackColor} text-white text-center font-bold`}>
              {video?.owner?.[0]?.toUpperCase() || "V"}
            </AvatarFallback>
          </Avatar>

          {/* Video Details */}
          <div className="w-full">
            <CardTitle className="text-sm font-semibold leading-tight line-clamp-2 mb-1">
              {video?.title}
            </CardTitle>

            <p className="text-gray-400 text-xs flex items-center gap-1">
              {video?.owner}
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500 text-xs">{video?.views || 0} views</p>
              <span className="text-gray-500 text-xs"><Dot size={20}/></span>
              <p className="text-gray-500 text-xs">{getTimeAgo(video?.createdAt)}</p>
            </div>
          </div>
          {/* More option button this button will contain some options like share, save in playlist, etc... */}
          <div className=" w-10 flex justify-center items-center ">
          <button className="h-full w-full cursor-pointer" onClick={()=>setToggleMoreOpt(!toggleMoreOpt)}>
          <MoreVertical height={50}  className="" />
          </button>
          </div>
          {/* more option -> pop up */}
          {toggleMoreOpt && (
            <div className="inset-0 ">
            <li>
              <ul><Share2/> Share</ul>
            </li>
          </div>
          )}
        </CardContent>
      
    </Card>
  );
};

export default VideoCard;
