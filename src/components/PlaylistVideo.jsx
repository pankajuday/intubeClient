import React, { useEffect, useState } from "react";
import defImg from "../assets/playlist.png";
import { Card, CardContent } from "./ui/card";
import { Plus, Share2, Edit, X, Dot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPlaylistById } from "@/Redux";
import { Link, useParams } from "react-router-dom";
import ShareCard from "./ShareCard";
import { getTimeAgo } from "@/utils/formateDate";
import { createPortal } from 'react-dom';

function PlaylistVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const playlistId = useParams();
  const dispatch = useDispatch();
  const { selectedPlaylist, playlistError, playlistIsLoading } = useSelector(
    (state) => state.playlist
  );

  // Format duration for display
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    dispatch(fetchGetPlaylistById(playlistId?.playlistId));
  }, []);  const ShareModal = () => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0" style={{ zIndex: 9999 }}>
        <div className="modal-overlay" onClick={() => setIsOpen(false)} />
        <div className="modal-container">
          <div 
            className="modal-content dark:bg-slate-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                Share Playlist
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </button>
            </div>
            <ShareCard propId={playlistId.playlistId} type="playlist" />
          </div>
        </div>
      </div>,
      document.body
    );
  };
  return (
    <div className="container mx-auto p-4">
      {/* Render Share Modal */}
      <ShareModal />
      
      <div className="flex flex-col lg:flex-row gap-6 relative min-h-screen">
        {/* Left Side - Fixed Playlist Info */}
        <div className="lg:w-1/3 lg:fixed lg:top-20 lg:max-w-[400px]">
          <Card className="h-full">
            <CardContent className="p-6 space-y-4 md:xl:h-[calc(100vh-150px)]">
              {/* Default Image */}
              <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedPlaylist[0]?.videos[0]?.thumbnail || defImg}
                  alt="Playlist cover"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Title and Actions */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {selectedPlaylist[0]?.name}
                </h2>
                <div className="flex gap-3">
                  <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Edit playlist"
                  >
                    <Edit
                      size={20}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Share playlist"
                  >
                    <Share2
                      size={20}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </button>
                </div>
              </div>              {/* Share button actions handled above */}

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300">
                {selectedPlaylist[0]?.description}
              </p>

              {/* Video Count */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedPlaylist[0]?.videos?.length || 0} videos
              </div>
            </CardContent>
          </Card>
        </div>        {/* Right Side - Scrollable Video List */}
        <div className="lg:w-2/3 lg:ml-[400px] space-y-3 p-2 relative z-0">
          {selectedPlaylist[0]?.videos?.map((video, index) => (
            <div key={video?._id} className="w-full space-y-2 video-list-item">
              <div className="w-full rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/video/${video?._id}`} className="flex md:flex-row w-full h-fit flex-col md:h-32">                  {/* Thumbnail with Index */}
                  <div className="relative w-full md:w-56 min-w-[11rem] md:min-w-[14rem] bg-slate-700 video-thumbnail">
                    <img
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                      {index + 1}
                    </div>
                    {video?.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video?.duration)}
                      </span>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex flex-col justify-between p-3 w-full">
                    <div>
                      <h3 className="font-medium text-base line-clamp-2 mb-1 dark:text-white">
                        {video?.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {video?.owner || "Unknown creator"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{(video?.views || 0).toLocaleString()} views</span>
                      <Dot/>
                      <span>{getTimeAgo(video?.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistVideo;
