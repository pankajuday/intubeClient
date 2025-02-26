import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardContent, Card, CardTitle } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const VideoCard = ({ video }) => {
  const [fallbackColor, setFallbackColor] = useState("");

  useEffect(() => {
    setFallbackColor(getRandomColor()); // Set random color on mount
  }, []);

  return (
    <>
     

      <Card className="w-96 h-72  rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105 ">
        <Link to={`/video/${video?._id}`} className="block">
          {/* video thumbnail */}
          <AspectRatio ratio={16 / 8} className="w-full h-48  object-cover bg-slate-700 ">
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="rounded-sm object-cover w-full h-full"
            />
            {/* video duration */}
            {video?.duration && (
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {(video?.duration / 60).toFixed(2)}
              </span>
            )}
          </AspectRatio>
          <CardContent className="flex gap-3 p-2  ">
            <Avatar>
              <AvatarImage src={video?.avatar} />
              <AvatarFallback className={`${fallbackColor}`}>
                {video?.owner}
              </AvatarFallback>
            </Avatar>

            {/* Video Details */}
            <div>
            <CardTitle className="text-sm font-semibold leading-tight h-10">
                {video?.title}
            </CardTitle>

            <p className="text-gray-400 text-sm flex items-center gap-1 h-5">
              {video?.owner}
            </p>
            <div className="flex space-x-2 h-5">
            <p className="text-gray-500 text-xs">{video?.views} {"views"}</p>
            <span className="text-gray-500 text-xs">•</span>
            <p className="text-gray-500 text-xs">{video?.createdAt}</p>
            </div>
            </div>
            
            
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default VideoCard;
