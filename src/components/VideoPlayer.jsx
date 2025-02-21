import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoByIdSlice } from "@/Redux/slices/video/videoSlice";

const VideoPlayer = () => {
  const videoRef = useRef(null);
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
  const [isClickedSetting, setIsClickedSetting ] = useState(false)



   const { videoId } = useParams();
    const dispatch = useDispatch()
    const {selectedVideo, loading, error } = useSelector((state)=>state.video)
    console.log("selectedVideo",selectedVideo)
    console.log("loading",loading)
    console.log("error",error)


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

  const handleFullScreenToggle = () => {
    // if (document.exitFullscreen) return document.exitFullscreen();
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(!isFullScreen);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(!isFullScreen);
    }
    // setIsFullScreen(!isFullScreen);
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
    // videoRef.current.volume = e
    // // console.log(videoRef);

    // setVolume(e)

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
    if (videoRef.current) {
      videoRef.current.seekTo(seconds);
      setProgress(seconds);
    }
  };

  const pipHandler = () => {
    if (isPip) {
      document.exitPictureInPicture();
    } else {
      document.documentElement.requestPictureInPicture();
    }
    setIsPip(!isPip);
  };
  const settingClickHandler = ()=>{
    setIsClickedSetting(!isClickedSetting)
  }

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

  useEffect(() => {
    if (videoId) { 
      console.log(videoId);
      
         dispatch(fetchVideoByIdSlice(videoId))
    }else{
      console.log("video id not found")
    }

    if (videoRef.current && videoRef.current.getDuration()) {
      setDuration(videoRef.current.getDuration());
    }
  }, [videoRef.current, dispatch]);

  return (
    <AspectRatio
      ratio={16 / 9}
      className={`bg-black flex flex-wrap flex-cols ${
        isFullScreen
          ? "h-full w-full"
          : "sm:h-[574px] sm:w-[1020px] xl:h-[574px] xl:w-[1020px] h-[360px] w-[640px]"
      } relative text-white  overflow-hidden`}
    >
      <ReactPlayer
        ref={videoRef}
        url={selectedVideo?.videoFile}
        width="100%"
        height="100%" // Maintain aspect ratio
        // controls={true}
        playing={isPlaying}
        playsinline={true}
        onProgress={handleProgress} // Track progress
        onReady={() => {
          if (videoRef.current && videoRef.current.getDuration()) {
            setDuration(videoRef.current.getDuration());
          }
        }}
        volume={volume}
        muted={isMuted}
        pop={isPip}
      />
      {/* Main window which contain all components */}
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
            onDoubleClick={handleFullScreenToggle}
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
                  <Settings className={`${isClickedSetting?" rotate-50 transition-all duration-200":"rotate-0  transition-all duration-200"}`}/>
                </button>
                <button onClick={pipHandler}>
                  <PictureInPicture2 />
                </button>
                <button onClick={handleFullScreenToggle}>
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
  );
};

export default VideoPlayer;
