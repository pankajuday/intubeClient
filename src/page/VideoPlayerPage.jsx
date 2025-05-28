import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import VideoCard from "../components/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsOnVideo,
  fetchLikeOnComment,
  fetchRelatedVideos,
} from "@/Redux/";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SpringLoader from "@/components/SpringLoader";
import VideoComments from "@/components/VideoComments";
import VideoCommentCard from "@/components/VideoCommentCard";
import { Button } from "@/components/ui/button";
import NotFound from "@/Error/NotFound";

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const {
    relatedVideos,
    relatedVideosLoading,
    relatedVideosError,
    videoError,
  } = useSelector((state) => state.video);

  const { commentData, commentLoading, commentError } = useSelector(
    (state) => state.comment
  );

  const [isActiveComment, setIsActiveComment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when viewing a video
    if (videoId) {
      dispatch(fetchRelatedVideos(videoId));
      dispatch(fetchCommentsOnVideo(videoId));
      // dispatch(fetchLikeOnComment());
    }
  }, [videoId, dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Main Content - Video Player */}
        {videoError === null ? (
          <div className="lg:w-2/3 w-full mb-6 lg:mb-0">
            <VideoPlayer />
            <div className="w-full space-y-3 p-3">
              <VideoComments />
              <div className="flex flex-row justify-center items-center">
                <div className="w-[85%]">
                  <hr />
                </div>

                <div onClick={() => setIsActiveComment(!isActiveComment)}>
                  <Button variant="link">
                    <span className=" text-sm border-b-2 border-b-accent ">
                      {isActiveComment ? "Hide" : "Show All"}
                    </span>
                  </Button>
                </div>
              </div>

              {isActiveComment ? (
                commentLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton circle width={40} height={40} />
                        <div className="flex-1">
                          <Skeleton width={200} height={20} />
                          <Skeleton width="100%" height={40} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : commentError ? (
                  <p className="text-red-500 text-center">
                    Error loading comments
                  </p>
                ) : commentData?.docs?.length > 0 ? (
                  commentData.docs.map((comment) => (
                    <VideoCommentCard key={comment._id} data={comment} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet
                  </p>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="relative top-0 w-full">
            <NotFound />
          </div>
        )}

        {/* Sidebar - Related Videos */}
        <div className="lg:w-1/3 w-full">
          <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
          <div className="space-y-3">
            {relatedVideosLoading ? (
              Array(5)
                .fill()
                .map((_, i) => (
                  <div key={i} className="flex space-x-2">
                    <Skeleton height={90} width={160} />
                    <div className="flex-1">
                      <Skeleton width="100%" height={20} />
                      <Skeleton width="80%" height={15} />
                      <Skeleton width="60%" height={15} />
                    </div>
                  </div>
                ))
            ) : relatedVideos && relatedVideos.length > 0 ? (
              relatedVideos.map(
                (video) =>
                  video && (
                    <div
                      key={video._id}
                      className="transition-all duration-200 hover:bg-gray-50 rounded-lg p-3"
                    >
                      <VideoCard video={video} />
                    </div>
                  )
              )
            ) : (
              <div className="text-center py-8">
                {relatedVideosError ? (
                  <p className="text-red-500">Error loading related videos</p>
                ) : (
                  <p className="text-gray-500">No related videos found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
