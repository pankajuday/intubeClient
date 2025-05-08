import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Twitter, Linkedin, MessageCircle, Copy, Check, Facebook, Mail } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/Notification/Toast";

const ShareCard = ({ videoId: propVideoId }) => {
  const params = useParams();
  const videoId = propVideoId || params.videoId; // Use prop if provided, otherwise use from params
  const [copied, setCopied] = useState(false);
  const baseURL = window.location.origin;
  const videoURL = `${baseURL}/video/${videoId}`;

  // Reset copy status after 3 seconds
  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  // Copy URL to clipboard
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(videoURL).then(() => {
  //     setCopied(true);
  //   });
  // };
  function handleCopy() {
    navigator.clipboard.writeText(videoURL)
      .then(() => showSuccessToast("Link copied to clipboard"))
      .catch(() => showErrorToast("Failed to copy link"));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 flex-wrap">
        {/* Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=Check out this awesome video! ${videoURL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
          <span className="ml-1 text-sm">Twitter</span>
        </a>

        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Check out this video: " + videoURL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle size={18} />
          <span className="ml-1 text-sm">WhatsApp</span>
        </a>

        {/* LinkedIn Share */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoURL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
          <span className="ml-1 text-sm">LinkedIn</span>
        </a>
      </div>
      
      {/* Additional share options for mobile */}
      <div className="flex flex-row gap-2 flex-wrap ">
        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoURL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
          <span className="ml-1 text-sm">Facebook</span>
        </a>

        {/* Email Share */}
        <a
          href={`mailto:?subject=Check out this video&body=${encodeURIComponent("I thought you might like this video: " + videoURL)}`}
          className="flex-1 p-2 bg-gray-500 text-white rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
          aria-label="Share via Email"
        >
          <Mail size={18} />
          <span className="ml-1 text-sm">Email</span>
        </a>
      </div>

      {/* Copy Link */}
      <div className="mt-2 flex items-center">
        <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-l-lg p-2 overflow-hidden text-sm text-gray-700 dark:text-slate-200 truncate">
          {videoURL}
        </div>
        <button
          onClick={handleCopy}
          className={`p-2 ${copied ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-600'} rounded-r-lg hover:bg-opacity-90 transition-colors`}
          aria-label="Copy link"
        >
          {copied ? <Check size={18} className="text-white" /> : <Copy size={18} className="text-gray-700 dark:text-white" />}
        </button>
      </div>
      {copied && (
        <span className="text-green-500 text-xs mt-1">Link copied to clipboard!</span>
      )}
    </div>
  );
};

export default ShareCard;
