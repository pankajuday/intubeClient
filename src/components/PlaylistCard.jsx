import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "react-router-dom";
import { formatDate, getRandomColor } from "@/lib/utils";
import defaultImg from "../assets/playlist.png";

const PlaylistCard = ({ data }) => {
  const [fallbackColor, setFallbackColor] = useState("");

  useEffect(() => {
    setFallbackColor(getRandomColor());
  }, []);

  return (
    <Card className="w-full rounded-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <Link to={`/playlist/${data?._id}`} className="block">
        <CardContent className="p-0">
          {/* Playlist Thumbnail */}
          <AspectRatio ratio={16 / 9} className="bg-slate-200">
            <img
              src={data?.videos?.[0]?.thumbnail || defaultImg}
              alt={data?.name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>

          {/* Video Count */}
          {/* <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {data?.videos?.length || 0} videos
          </div> */}

          {/* Author Info */}
          <div className="flex gap-3 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data?.owner?.avatar} />
              <AvatarFallback className={`${fallbackColor} text-white text-center font-bold`}>
                {data?.owner?.username?.[0]?.toUpperCase() || "P"}
              </AvatarFallback>
            </Avatar>

            {/* Playlist Details */}
            <div className="w-full">
              <CardTitle className="text-sm font-semibold leading-tight line-clamp-2 mb-1">
                {data?.name}
              </CardTitle>

              <p className="text-gray-400 text-xs flex items-center gap-1">
                {data?.owner?.fullName}
              </p>
              <div className="flex space-x-2">
                <p className="text-gray-500 text-xs">
                  {formatDate(data?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlaylistCard;
