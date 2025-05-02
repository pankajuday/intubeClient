import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  SkipBack,
  SkipForward,
  Settings,
  Heart,
  Share,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVideoById } from "@/Redux/Slices/Video";
import SpringLoader from "./SpringLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  fetchSubscribedChannels,
  fetchToggleSubscription,
  fetchUserDetail,
  likedVideoSlice,
  likeToggleSlice,
} from "@/Redux";
import ShareCard from "./ShareCard";
import { formatDate, getRandomColor } from "@/lib/utils";

const VideoPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [displayTrigger, setDisplayTrigger] = useState(false);
  const [isPip, setIsPip] = useState(false);

  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const [isClickedSetting, setIsClickedSetting] = useState(false);
  const [mediaLoader, setMediaLoader] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { likeData, likeLoading, likeError } = useSelector(
    (state) => state.like
  );

  const { subscribedChannels, subscriptionIsLoading, subscriptionError } =
    useSelector((state) => state.subscription);

  const { userDetail, isLoading } = useSelector((state) => state.user);

  const { videoId } = useParams();
  const dispatch = useDispatch();

  const {
    selectedVideo,
    videoLoading,
    videoError,
  } = useSelector((state) => state.video);

  useEffect(() => {
    if (videoId) {
      
      if (videoId) {
        dispatch(likedVideoSlice());
        dispatch(fetchVideoById(videoId));
      }
      if (userDetail?._id) {
        dispatch(fetchSubscribedChannels(userDetail?._id));
      }
    }
  }, [dispatch, videoId, userDetail]);

  useEffect(() => {
    setFallbackColor(getRandomColor());
  }, []);

  const onDescToggle = () => {
    setDescriptionToggle(!descriptionToggle);
  };

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMuteHandler = () => {
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullScreen(true);
      } else {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const settingClickHandler = () => {
    setIsClickedSetting(!isClickedSetting);
  };

  const pipHandler = () => {
    setIsPip(!isPip);
  };

  const toggleSubscription = () => {
    dispatch(fetchToggleSubscription(selectedVideo?.owner?._id)).then(() => {
      if (userDetail?._id) {
        dispatch(fetchSubscribedChannels(userDetail?._id));
      }
    });
  };

  useEffect(() => {
    if (selectedVideo?.owner?._id && subscribedChannels) {
      const isUserSubscribed = subscribedChannels.some(
        (ch) => ch._id === selectedVideo.owner._id
      );
      setIsSubscribed(isUserSubscribed);
    }
  }, [selectedVideo, subscribedChannels]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (progressRef.current) {
      progressRef.current.seekTo(newTime);
    }
  };

  const handleLikeToggle = () => {
    if (selectedVideo?._id) {
      dispatch(likeToggleSlice(selectedVideo?._id)).then(() => {
        setIsLiked(!isLiked);
      });
    }
  };

  useEffect(() => {
    function toggleLike() {
      if (Array.isArray(likeData?.data)) {
        setIsLiked(likeData.data.some((item) => item?._id === videoId));
      }
    }
    toggleLike();
  }, [likeData, videoId]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {videoLoading ? (
        <div>
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="h-10 w-full" />
          <div className="flex items-center gap-3 mt-3">
            <Skeleton height={50} width={50} circle />
            <Skeleton height={50} width="80%" />
          </div>
          <Skeleton className="h-10 w-full mt-3" />
        </div>
      ) : (
        <div>
          {/* Video Player */}
          <div className="relative bg-black aspect-video w-full text-white overflow-hidden"
           ref={videoRef}
          >
            <ReactPlayer
              ref={progressRef}
              url={selectedVideo?.videoFile}
              width="100%"
              height="100%"
              playing={isPlaying}
              playsinline={true}
              onProgress={handleProgress}
              volume={volume}
              muted={isMuted}
              pip={isPip}
              onDuration={(duration) => setDuration(duration)}
              onBuffer={() => setMediaLoader(true)}
              onBufferEnd={() => setMediaLoader(false)}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
              className="react-player"
            />

            {/* Loading overlay */}
            {mediaLoader && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                <SpringLoader />
              </div>
            )}

            {/* Video controls overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: displayTrigger ? 1 : 0 }}
              onMouseEnter={() => setDisplayTrigger(true)}
              onMouseLeave={() => setDisplayTrigger(false)}
            >
              {/* Play/Pause button in center */}
              <div
                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                onClick={togglePlayPause}
                onDoubleClick={handleFullScreen}
              >
                {isPlaying ? (
                  <Pause className="text-green-400 h-16 w-16 md:h-24 md:w-24" />
                ) : (
                  <Play className="text-green-400 h-16 w-16 md:h-24 md:w-24" />
                )}
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                {/* Progress bar */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={progress}
                  step={0.1}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #10B981 ${
                      (progress / (duration || 100)) * 100
                    }%, #4B5563 ${(progress / (duration || 100)) * 100}%)`,
                  }}
                />

                {/* Control buttons */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button onClick={togglePlayPause}>
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1">
                      <button onClick={toggleMuteHandler}>
                        {isMuted || volume === 0 ? (
                          <VolumeX size={20} />
                        ) : (
                          <Volume2 size={20} />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Skip buttons */}
                    <button>
                      <SkipBack size={20} />
                    </button>
                    <button>
                      <SkipForward size={20} />
                    </button>
                  </div>

                  {/* Right controls */}
                  <div className="flex gap-3">
                    <button onClick={settingClickHandler}>
                      <Settings
                        className={`transition-transform duration-200 ${
                          isClickedSetting ? "rotate-90" : ""
                        }`}
                        size={20}
                      />
                    </button>
                    <button onClick={pipHandler}>
                      <PictureInPicture2 size={20} />
                    </button>
                    <button onClick={handleFullScreen}>
                      {isFullScreen ? (
                        <Minimize size={20} />
                      ) : (
                        <Maximize size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info Section */}
          <div className="mt-4 space-y-4 ">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-semibold px-2">
              {selectedVideo?.title}
            </h1>

            {/* Channel info and actions */}
            <div className="flex flex-col md:flex-row md:justify-between border-y py-3 px-2 gap-4">
              {/* Channel info */}
              <div className="flex items-center gap-3">
                <Avatar className="outline-1 outline-slate-950">
                  <AvatarImage src={selectedVideo?.owner?.avatar} />
                  <AvatarFallback className={`${fallbackColor}`}>
                    {selectedVideo?.owner?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <a
                    href={`/profile/${selectedVideo?.owner?.username}`}
                    className="text-base font-semibold hover:text-gray-700"
                  >
                    {selectedVideo?.owner?.fullName}
                  </a>
                  <p className="text-xs text-gray-500">
                    {selectedVideo?.owner?.subscribers || 0} subscribers
                  </p>
                </div>
                {/* Subscribe button - only show if not own video */}
                {selectedVideo?.owner?._id !== userDetail?._id && (
                  <button
                    onClick={toggleSubscription}
                    className={`ml-3 px-4 py-2 rounded-md text-sm font-medium ${
                      isSubscribed
                        ? "bg-gray-200 hover:bg-gray-300"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                    disabled={subscriptionIsLoading}
                  >
                    {subscriptionIsLoading
                      ? "Loading..."
                      : isSubscribed
                      ? "Unsubscribe"
                      : "Subscribe"}
                  </button>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex  items-center justify-around gap-4">
                <button
                  onClick={handleLikeToggle}
                  className="flex items-center gap-1"
                  disabled={likeLoading}
                >
                  {likeLoading ? (
                    <SpringLoader />
                  ) : (
                    <Heart
                      className={`${
                        isLiked
                          ? "fill-red-500 text-red-500"
                          : "hover:text-gray-600"
                      }`}
                      size={20}
                    />
                  )}
                  <span className="text-sm">{selectedVideo?.likes}</span>
                </button>

                <div className="relative ">
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <Share size={20} className="hover:text-gray-600" />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-full right-0 mb-2">
                      <ShareCard videoId={videoId} />
                    </div>
                  )}
                </div>

                <button>
                  <Bookmark size={20} className="hover:text-gray-600" />
                </button>

                <button>
                  <EllipsisVertical size={20} className="hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div
              className={`border-b pb-4 px-2 ${
                descriptionToggle ? "h-auto" : "h-24 overflow-hidden"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-3 text-sm">
                  <span>{selectedVideo?.views || 0} views</span>
                  <span>•</span>
                  <span>
                    {selectedVideo?.createdAt
                      ? formatDate(selectedVideo.createdAt)
                      : ""}
                  </span>
                </div>
                <button
                  onClick={onDescToggle}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {descriptionToggle ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronLeft size={20} />
                  )}
                </button>
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {selectedVideo?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(VideoPlayer);
