import React, { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { getRandomColor } from "@/lib/utils";
import defAvatar from "../assets/defaultAvatar.png";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MoreHorizontalIcon, ThumbsUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeOnComment, fetchToggleLikeOnComment } from "@/Redux";
import { fetchLikeStatus, setLikeLoadingState } from "@/Redux/Slices/Comment";

function VideoCommentCard({ data, videoId }) {
  const [fallbackColor, setFallbackColor] = useState("");
  // const [isLiked, setIsLiked] = useState(false)
  const {
    commentData,
    commentLoading,
    commentError,
    likedCommentError,
    likedCommentLoading,
    likedCommentData,likedComments, likeLoadingStates
  } = useSelector((state) => state.comment);
  const isLiked = likedComments[data._id];
  const isLoading = likeLoadingStates[data._id];

  const dispatch = useDispatch();
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    setFallbackColor(getRandomColor());
    async function fetchLC(){
      if (data?._id) {
        await dispatch(fetchLikeOnComment(data?._id)).unwrap();
        // console.log(likedCommentData);
        // console.log(data?._id);
      }
    }
    fetchLC()
    
  }, []);

  useEffect(() => {
    // Only fetch like status if we don't have it yet
    if (data._id && likedComments[data._id] === undefined) {
      dispatch(fetchLikeStatus(data._id));
    }
  }, [data._id, dispatch, likedComments]);

  // const handleToggleLikeOncomment = async () => {
  //   try {
  //     if (data?._id) {
  //       setIsLikeLoading(true);
  //        await dispatch(fetchToggleLikeOnComment(data?._id));
  //       setIsLikeLoading(false);
  //     }
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  const handleToggleLikeOncomment = async () => {
    try {
        dispatch(setLikeLoadingState({ commentId: data._id, isLoading: true }));
        await dispatch(fetchToggleLikeOnComment(data._id)).unwrap();
      

    } catch (error) {
        console.error(error);
    }
};



  return (
    <Card className="w-full hover:bg-accent/20 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Avatar section */}
          <Avatar className="h-10 w-10">
            <AvatarImage src={data?.owner?.avatar} alt={data?.owner} />
            <AvatarFallback
              className={`${fallbackColor} text-white text-center font-bold`}
            >
              {data?.owner?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Comment content section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {data?.owner?.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {data?.createdAt ? formatDate(data?.createdAt) : ""}
              </span>
            </div>

            {/* Comment text */}
            <p className="text-sm text-foreground/90 leading-relaxed">
              {data?.content}
            </p>

            {/* Like button */}
            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={handleToggleLikeOncomment}
              >
                {isLoading ? (
                  <MoreHorizontalIcon />
                ) : (
                  <ThumbsUp
                    className={`h-4 w-4 mr-1 ${
                      isLiked ? "fill-blue-500 text-blue-500" : ""
                    } `}
                  />
                )}
                {/* <span className="text-xs">{data?.likes || 0}</span> */}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoCommentCard;
