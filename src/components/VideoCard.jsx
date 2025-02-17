import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link to={`/video/${video._id}`} className="block">
        {/* Thumbnail Container */}
        <div className="relative aspect-video">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          {/* Duration Badge */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {(video.duration/60).toFixed(2)}
            </span>
          )}
        </div>

        {/* Video Info */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 truncate">{video.owner && video.owner.fullName}</p>
          
          {/* Stats */}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>
              {new Date(video.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;