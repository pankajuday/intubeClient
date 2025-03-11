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
import { fetchVideoByIdSlice } from "@/Redux/slices/video/videoSlice";
import SpringLoader from "./SpringLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { likedVideoSlice, likeToggleSlice } from "@/Redux";
import ShareCard from "./ShareCard";

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

const VideoPlayer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const likeRef = useRef(false);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [displayTrigger, setDisplayTrigger] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [isClickedSetting, setIsClickedSetting] = useState(false);
  const [mediaLoader, setMediaLoader] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    likeData,
    isLoading: likeLoading,
    error: likeError,
  } = useSelector((state) => state.like);

  const { videoId } = useParams();
  const dispatch = useDispatch();

  const {
    selectedVideo,
    isLoading: videoLoading,
    error: videoError,
  } = useSelector((state) => state.video);

  console.log("MyComponent is rendering... from videoPlayer REdux");
  // console.log(toggleLike);

  // console.log(mediaLoader);
  // console.log(loading);
  console.log(videoError);

  useEffect(() => {
    getRandomColor();
    if (videoId) {
      dispatch(likedVideoSlice());
      dispatch(fetchVideoByIdSlice(videoId));
    }
  }, [videoId, dispatch]);

  // Check if the video is liked
  useEffect(() => {
    function toggleLike() {
      if (Array.isArray(likeData?.data)) {
        setIsLiked(likeData.data.some((item) => item?._id === videoId));
      }
    }
    toggleLike();
  }, [likeData, videoId]);

  const handleLikeToggle = () => {
    dispatch(likeToggleSlice(videoId))
      .unwrap()
      .then(() => {
        dispatch(likedVideoSlice());
      })
      .catch((error) => {
        console.error("Like toggle failed:", error);
      });
  };

  // Handle fullscreen
  // const toggleFullscreen = () => {
  //   if (videoRef.current.requestFullscreen) {
  //     videoRef.current.requestFullscreen();
  //   } else if (videoRef.current.mozRequestFullScreen) {
  //     /* Firefox */
  //     videoRef.current.mozRequestFullScreen();
  //   } else if (videoRef.current.webkitRequestFullscreen) {
  //     /* Chrome, Safari & Opera */
  //     videoRef.current.webkitRequestFullscreen();
  //   } else if (videoRef.current.msRequestFullscreen) {
  //     /* IE/Edge */
  //     videoRef.current.msRequestFullscreen();
  //   }
  // };

  if (videoError) {
    navigate("/error", { state: { error: videoError.message } });
  }

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // toggle handler mute button
  const toggleMuteUnmute = () => {
    // videoRef.current.muted = !isMuted;
    // setIsMuted(!isMuted);
    if (!isMuted) {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    } else {
      if (previousVolume > 0) {
        setVolume(previousVolume);
      } else {
        setVolume(1);
      }
      setIsMuted(false);
    }
  };

  // Handle Volume Progress
  const volumeProgresshandler = (e) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }
  };

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
  };

  const seekHandler = (seconds) => {
    if (progressRef.current) {
      progressRef.current.seekTo(seconds);
      setProgress(seconds);
    }
  };

  const pipHandler = () => {
    setIsPip(!isPip);
  };
  const settingClickHandler = () => {
    setIsClickedSetting(!isClickedSetting);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const onMediaLoader = () => {
    setMediaLoader(!mediaLoader);
  };
  const onDescToggle = () => {
    setDescriptionToggle(!descriptionToggle);
  };

  const convertCreatedAt = (date) => {
    const _date = new Date(date);
    const day = String(_date.getUTCDate()).padStart(2, "0"); // Get day (02)
    const month = String(_date.getUTCMonth() + 1).padStart(2, "0"); // Get month (02)
    const year = _date.getUTCFullYear(); // Get year (2025)
    const months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    return `${day} ${months[parseInt(month)]} ${year}`;
  };

  return (
    <div>
      {videoLoading ? (
        <div>
          <Skeleton className="  sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px] " />
          <Skeleton className=" h-10 w-full  " />
          <div className="flex items-center justify-around">
            <Skeleton height={50} width={50} circle />
            <Skeleton height={50} width={900} />
          </div>
          <Skeleton className=" h-10 w-full" />
        </div>
      ) : (
        <div className="">
          <AspectRatio
            ref={videoRef}
            ratio={16 / 9}
            className={`bg-black flex flex-wrap flex-cols sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px] relative text-white  overflow-hidden `}
          >
            <ReactPlayer
              ref={progressRef}
              url={selectedVideo?.videoFile}
              width="100%"
              height="100%" // Maintain aspect ratio
              // controls={true}
              playing={isPlaying}
              playsinline={true}
              onProgress={handleProgress} // Track progress
              // onReady={() => {
              //   if (videoRef.current && videoRef.current.getDuration()) {
              //     setDuration(videoRef.current.getDuration());
              //   }
              // }}
              volume={volume}
              muted={isMuted}
              pip={isPip}
              onDuration={(duration) => setDuration(duration)}
              onBuffer={() => setMediaLoader(!mediaLoader)}
              onBufferEnd={() => setMediaLoader(!mediaLoader)}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
            {/* buffer animation SpringLoader */}

            {/* Main window which contain all components */}
            <div className=" h-full w-full absolute justify-center items-center flex">
              {mediaLoader ? <SpringLoader text-green-400 h-24 w-24 /> : ""}
            </div>
            
            <div
              className=" h-full w-full text-white absolute"
              onMouseEnter={() => setDisplayTrigger(!displayTrigger)}
              onMouseLeave={() => setDisplayTrigger(!displayTrigger)}
            >
              {/* 1st Sub window where implement play pause controls  */}
              {displayTrigger ? (
                <div
                  className="relative w-full h-full flex justify-center items-center"
                  onClick={togglePlayPause}
                  onDoubleClick={handleFullScreen}
                >
                  {isPlaying ? (
                    <Pause className="text-green-400 h-24 w-24 " />
                  ) : (
                    <Play className="text-green-400  h-24 w-24" />
                  )}
                </div>
              ) : (
                ""
              )}
              {/* 2nd Sub  where implemented all controls */}
              {displayTrigger ? (
                <div className="h-20 w-full bottom-0 absolute justify-center items-center flex flex-col space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={progress}
                    step={0.1}
                    onChange={(e) => seekHandler(parseFloat(e.target.value))}
                    className="w-[95%] accent-green-400  "
                  />

                  <div className="flex flex-row relative h-auto w-[95%] ">
                    {/* video duration total and current */}
                    <div className="duration  text-white items-center  flex w-[25%] ">
                      {formatTime(duration)} / {formatTime(progress)}
                    </div>

                    {/* volume */}
                    <div className="flex items-center  w-[30%]">
                      <button onClick={toggleMuteUnmute}>
                        {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.001}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => volumeProgresshandler(e.target.value)}
                        className=" accent-green-400  "
                      />
                    </div>

                    {/* button for previous video and next video */}
                    <div className="flex flex-row space-x-20  w-[30%]">
                      <button>
                        <SkipBack />
                      </button>
                      <button>
                        <SkipForward />
                      </button>
                    </div>

                    {/* screen mode PoPup max min */}

                    <div className="flex flex-row items-center justify-between w-[20%] space-x-10">
                      <button onClick={settingClickHandler}>
                        <Settings
                          className={`${
                            isClickedSetting
                              ? " rotate-50 transition-all duration-200"
                              : "rotate-0  transition-all duration-200"
                          }`}
                        />
                        {/* picture in picture mode  */}
                      </button>
                      <button onClick={pipHandler}>
                        <PictureInPicture2 />
                      </button>
                      <button onClick={handleFullScreen}>
                        {isFullScreen ? <Minimize /> : <Maximize />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </AspectRatio>

          {/* Video Info Section */}
          <div className="mt-6 space-y-4">
            {videoLoading ? (
              <div>
                <Skeleton width={480} height={32} />
                <Skeleton width={360} height={24} />
                <Skeleton count={3} />
              </div>
            ) : (
              <div>
                <div className="h-8  w-full  ">
                  <h1 className="text-xl font-semibold mb-4 ml-3  ">
                    {selectedVideo?.title}
                  </h1>
                </div>

                <div className="h-14 w-full  flex flex-row justify-between border-b-2  border-b-gray-400 border-t-2  border-t-gray-400">
                  {/* user profile section  */}
                  <div className="h-14 w-[25%]  items-center flex  ">
                    <Avatar className="ml-3 outline-1 outline-slate-950 ">
                      <AvatarImage src={selectedVideo?.owner?.avatar} />
                      <AvatarFallback className={`${fallbackColor}`}>
                        {selectedVideo?.owner?.username}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col  ml-2">
                      <a href="#" className="text-xl font-bold">
                        {selectedVideo?.owner?.username}
                      </a>
                      <span className="text-gray-600">total subscriber</span>
                    </div>
                  </div>
                  {/* subscription button */}
                  <div className="w-[15%] justify-center items-center flex ">
                    <button className="border-2 rounded-4xl cursor-pointer bg-slate-950 h-10 w-36 text-white outline-2 outline-slate-900 hover:bg-slate-700">
                      <span>Subscribe</span>
                    </button>
                  </div>

                  <div className="h-14 w-[60%] flex  items-center justify-around flex-row">
                    {likeLoading ? (
                      <SpringLoader />
                    ) : (
                      <button onClick={handleLikeToggle}>
                        {isLiked ? (
                          <Heart className="fill-red-500 text-red-500" />
                        ) : (
                          <Heart className="hover:fill-slate-300 hover:text-slate-300" />
                        )}
                      </button>
                    )}
                    <Share onClick={() => setIsOpen(!isOpen)} />
                    <div className="absolute bottom-0 flex  justify-center items-center ">
                      {isOpen ? <ShareCard videoId={videoId} /> : ""}
                    </div>

                    <Bookmark className="hover:fill-slate-300 hover:text-slate-300" />
                    <EllipsisVertical />
                  </div>
                </div>

                {/* description */}

                <div
                  className={`${
                    descriptionToggle ? "h-fit " : "h-10"
                  } w-full overflow-hidden relative border-b-2 border-b-gray-400 `}
                >
                  <div className="absolute h-9 w-10  right-0 justify-center items-center flex z-0">
                    <button onClick={onDescToggle}>
                      {descriptionToggle ? <ChevronDown /> : <ChevronLeft />}
                    </button>
                  </div>
                  {/* date and title */}
                  <div className="flex flex-wrap ">
                    <span className="m-2 ">
                      {convertCreatedAt(selectedVideo?.createdAt)}{" "}
                    </span>
                    <span className="m-2 ">{selectedVideo?.title}</span>
                  </div>
                  {/* description string */}
                  <div className="flex flex-wrap m-2 p-2">
                    {selectedVideo?.description}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
