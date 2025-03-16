import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import defaultImg from "../assets/playlist.png";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

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
const PlaylistCard = ({ data }) => {
  const [fallbackColor, setFallbackColor] = useState("");

  useEffect(() => {
    setFallbackColor(getRandomColor()); // Set random color on mount
  }, []);

  return (
    <div>
      <Card className="w-96 h-72 min-h-42 min-w-60 grid rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105 ">
        <Link to={`/playlist/${data?._id}`} className="block">
          {/* video thumbnail */}
          <AspectRatio
            ratio={16 / 8}
            className="w-full h-48  object-cover bg-slate-700 "
          >
            <img
              src={defaultImg}
              alt={data?.title}
              className="rounded-sm object-cover w-full h-full"
            />
            {/* video duration */}
            
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {data?.total}
              </span>
            
          </AspectRatio>
          <CardContent className="flex gap-3 p-2  ">
            <Avatar>
              <AvatarImage src={data?.owner?.avatar} />
              <AvatarFallback
                className={`${fallbackColor} text-white text-3xl text-center font-bold`}
              >
                {data?.owner?.username.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Video Details */}
            <div>
              <CardTitle className="text-sm font-semibold leading-tight h-10">
                {data?.name}
              </CardTitle>

              <p className="text-gray-400 text-sm flex items-center gap-1 h-5">
                {data?.owner?.fullName}
              </p>
              <div className="flex space-x-2 h-5">
                <p className="text-gray-500 text-xs">{data?.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default PlaylistCard;
