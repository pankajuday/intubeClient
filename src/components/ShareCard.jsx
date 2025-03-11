import React from "react";
import { Facebook, Twitter, Copy, MessageCircle, Linkedin } from "lucide-react"; 

const ShareCard = ({ videoId }) => {
  const videoURL = `${window.location.origin}/video/${videoId}`; 

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoURL);
    alert("Link copied to clipboard!"); // Simple alert instead of toast
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-sm p-4">
      <h3 className="text-lg font-semibold text-gray-800">Share this video</h3>
      
      <div className="flex space-x-4 mt-3  justify-center" >
        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?post=Check out this awesome video!`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 text-white rounded-lg flex items-center hidden"
          
        >
          <Facebook size={18} />
        </a>

        {/* Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=Check out this awesome video! ${videoURL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-400 text-white rounded-lg flex items-center"
        >
          <Twitter size={18} />
        </a>

        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Check out this video: " + videoURL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-green-500 text-white rounded-lg flex items-center"
        >
          <MessageCircle size={18} />
        </a>

        {/* LinkedIn Share */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?text=${videoURL} Check out this awesome video!`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-700 text-white rounded-lg flex items-center"
        >
          <Linkedin size={18} />
        </a>

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-200 text-gray-800 rounded-lg flex items-center"
        >
          <Copy size={18} />
        </button>
      </div>
    </div>
  );
};

export default ShareCard;
