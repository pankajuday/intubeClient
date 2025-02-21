// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// const VideoPlayer = () => {
//   const playerRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0); // Track video progress
//   const [duration, setDuration] = useState(0); // Track video duration
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1); // Default volume
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   useEffect(() => {
//     if (playerRef.current && playerRef.current.getDuration()) {
//       setDuration(playerRef.current.getDuration());
//     }
//   }, [playerRef.current]);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleProgress = (state) => {
//     setProgress(state.playedSeconds);
//   };

//   const handleSeek = (seconds) => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(seconds);
//     }
//   };

//   const handleVolumeChange = (newVolume) => {
//     setVolume(newVolume);
//   };

//   const handleMuteToggle = () => {
//     setIsMuted(!isMuted);
//   };

//   const handleFullScreenToggle = () => {
//     if (isFullScreen) {
//       document.exitFullscreen();
//     } else {
//       document.documentElement.requestFullscreen();
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <div className="relative aspect-video"> {/* Container for relative positioning */}
//       <ReactPlayer
//         ref={playerRef}
//         url="http://res.cloudinary.com/pankajuday/video/upload/v1731787164/sfje0tgt1spnvztw4bvk.mp4"
//         width="100%"
//         height="auto" // Maintain aspect ratio
//         playing={isPlaying}
//         playsinline={true}
//         onProgress={handleProgress} // Track progress
//         onReady={() => {
//           if (playerRef.current && playerRef.current.getDuration()) {
//             setDuration(playerRef.current.getDuration());
//           }
//         }}
//         volume={volume}
//         muted={isMuted}
//       />

//       {/* Custom Controls */}
//       <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <button onClick={handlePlayPause}>
//             {isPlaying ? "Pause" : "Play"}
//           </button>
//           {/* Progress Bar */}
//           <input
//             type="range"
//             min={0}
//             max={duration}
//             value={progress}
//             step={0.1}
//             onChange={(e) => handleSeek(parseFloat(e.target.value))}
//             className="w-48"
//           />
//           {/* Current Time / Duration */}
//           <span>{formatTime(progress)} / {formatTime(duration)}</span>

//           <button onClick={handleMuteToggle}>
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <input
//               type="range"
//               min={0}
//               max={1}
//               step={0.1}
//               value={volume}
//               onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
//               className="w-24"
//           />
//         </div>
//         <div>
//           <button onClick={handleFullScreenToggle}>
//             {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to format time (e.g., 00:30)
// const formatTime = (seconds) => {
//   if (isNaN(seconds)) {
//     return "00:00";
//   }
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);
//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
//   return `${formattedMinutes}:${formattedSeconds}`;
// };

// export default VideoPlayer;


// import React, { useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// const Test = ({ videoUrl }) => {
//   const playerRef = useRef(null);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [previousVolume, setPreviousVolume] = useState(1);
//   const [hasMounted, setHasMounted] = useState(false); // Track component mount

//   // useEffect(() => {
//   //   setHasMounted(true); // Set hasMounted after the initial render
//   // }, []);

//   const handleVolumeChange = (event) => {
//     const newVolume = parseFloat(event.target.value);
//     setVolume(newVolume);
//     if (newVolume > 0) {
//       setIsMuted(false);
//       setPreviousVolume(newVolume);
//     }
//   };

//   const handleMuteToggle = () => {
//     if (!isMuted) {
//       setPreviousVolume(volume);
//       setVolume(0);
//       setIsMuted(true);
//     } else {
//       if (previousVolume > 0) {
//         setVolume(previousVolume);
//       } else {
//         setVolume(1);
//       }
//       setIsMuted(false);
//     }
//   };

//   useEffect(() => {
//     if (playerRef.current && hasMounted) { // Check hasMounted *and* playerRef
//       const player = playerRef.current.getInternalPlayer(); // Get the internal player
//       if (player) { // Check if the internal player is available
//         if (isMuted) {
//           player.setVolume(0); // Use the internal player's setVolume
//         } else {
//           player.setVolume(volume);
//         }
//       }
//     }
//   }, [volume, isMuted, hasMounted]); // hasMounted in the dependency array

//   const handleReady = () => {
//     // No action needed here now
//   };

//   return (
//     <div>
//       <ReactPlayer
//         ref={playerRef}
//         url={videoUrl}
//         width="100%"
//         height="auto"
//         volume={isMuted ? 0 : volume}
//         onReady={handleReady} // Still necessary for other react-player functionality
//       />

//       <input
//         type="range"
//         min={0}
//         max={1}
//         step={0.01}
//         value={volume}
//         onChange={handleVolumeChange}
//         style={{ width: '100px' }}
//       />

//       <button onClick={handleMuteToggle}>{isMuted ? "Unmute" : "Mute"}</button>

//       <p>Volume: {isMuted ? "Muted" : Math.round(volume * 100) + "%"}</p>
//     </div>
//   );
// };

// export default Test;



// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVideoByIdSlice, fetchAllVideos } from "./Redux/slices/video/videoSlice";
// import { useParams } from "react-router-dom";
// import VideoPlayer from "./components/VideoPlayer";

// export default function Test() {
//   const videoId = "671ff57a887e39ced6b6fac7"
//   const vid = useParams()
//   const dispatch = useDispatch();
//   const { videos, loading, error } = useSelector((state) => state.video);

//   useEffect(() => {
//     dispatch(fetchAllVideos()); // Fetch videos on mount
//   }, [dispatch]);

//   if (loading) return <p>Loading videos...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="bg-black text-white h-full w-full">
//       {videos.data.docs[0].map((video) => (
//         <div key={video.id}>
//           <h3>{video.title}</h3>
//           <video controls src={video.url} width="400"></video>
//         </div>
//       ))}
//       {/* {...videos} */}
//       {/* <VideoPlayer content={}/> */}
//     </div>
//   );
// }


// Test.jsx
import React, { useEffect } from "react";
import { fetchAllVideos, fetchVideoByIdSlice } from "./Redux/slices/video/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Test() {
  const {videoId} = useParams()
    const dispatch = useDispatch();
    const { selectedVideo, loading, error } = useSelector((state) => state.video);

    useEffect(async() => {
        await dispatch(fetchVideoByIdSlice(videoId));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // 1. Check if content is an array before mapping
    // if (Array.isArray(content) && content.length > 0) {  // <-- Crucial check
        return (
            // <div className="h-96 w-96 justify-center items-center">
            //     {content.data.docs.map((video) => (
            //         <div key={video._id || video.id || nanoid()}>
            //             <p>{video.title}</p>
            //             {video.thumbnail && <img src={video.thumbnail} alt={video.title} />}
            //             {/* ... other video properties ... */}
            //         </div>
            //     ))}
            // </div>
            <div>
              {selectedVideo}
            </div>
        );
}