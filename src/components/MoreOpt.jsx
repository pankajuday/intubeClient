import { Share2, ListPlus, Bookmark, Flag } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddToPlaylist from "./AddToPlaylist";

export default function MoreOpt({ onClose, videoId, videoTitle }) {
  const menuRef = useRef(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const { userDetail, isLoading } = useSelector((state) => state.user);

  // Function to handle sharing via Web Share API
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.share) {
        await navigator.share({
          title: videoTitle || "Check out this video",
          url: `${window.location.origin}/video/${videoId}`,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(
          `${window.location.origin}/video/${videoId}`
        );
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
    // Only close after action completes
    if (onClose) onClose();
  };
  // Handle save to playlist
  const handleSaveToPlaylist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userDetail?._id) {
      alert("Please login to add to playlist");
      return;
    }
    setIsPlaylistModalOpen(true);
  };

  // Handle watch later
  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement watch later functionality
    alert("Added to Watch Later!");
    if (onClose) onClose();
  };

  // Handle report
  const handleReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement report functionality
    alert("Report feature will be implemented soon!");
    if (onClose) onClose();
  };

  return (
    <div
      ref={menuRef}
      className="origin-top-right rounded-sm shadow-xl bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none z-[1000]"
      role="menu"
      aria-orientation="vertical"
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "200px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="py-1">
        <li>
          <button
            type="button"
            onClick={handleShare}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            role="menuitem"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={handleSaveToPlaylist}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            role="menuitem"
          >
            <ListPlus size={16} />
            <span>Save to playlist</span>
          </button>
        </li>
        {/* <li>
          <button
            type="button"
            onClick={handleWatchLater}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            role="menuitem"
          >
            <Bookmark size={16} />
            <span>Watch later</span>
          </button>
        </li> */}
        <li>
          <button
            type="button"
            onClick={handleReport}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            role="menuitem"
          >
            <Flag size={16} />
            <span>Report</span>
          </button>
        </li>
      </ul>{" "}
      {isPlaylistModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsPlaylistModalOpen(false);
            if (onClose) onClose();
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddToPlaylist
              videoId={videoId}
              userId={userDetail?._id}
              onClose={() => {
                setIsPlaylistModalOpen(false);
                if (onClose) onClose();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
