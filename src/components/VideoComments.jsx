import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "@/lib/utils";
import { fetchUserDetail } from "@/Redux";
import { useParams } from "react-router-dom";
import { createVideoComment } from "@/Redux/Slices/Comment";

const CommentForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { userDetail } = useSelector((state) => state.user);
  const { commentLoading, commentError,likedCommentError,likedCommentLoading,likedCommentData } = useSelector((state) => state.comment);
  
  
  const commentContent = watch("content", "");
  const remainingChars = 250 - (commentContent?.length || 0);
  const [fallbackColor, setFallbackColor] = useState("");

  const handleFormSubmit = async (data) => {
    try {
      await dispatch(createVideoComment({ videoId, content: data.content })).unwrap();
      reset();
      setIsFocused(false);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  useEffect(() => {
    setFallbackColor(getRandomColor());
    if (!userDetail?._id) {
      dispatch(fetchUserDetail());
    }
  }, [dispatch, userDetail]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-4">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={userDetail?.avatar } alt="User" />
            <AvatarFallback className={`${fallbackColor} text-white text-center font-bold`}>
              {userDetail?.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="relative">
              <Textarea
                placeholder="Add a comment..."
                className={`resize-none transition-all duration-200 ${
                  isFocused ? "min-h-[80px] pb-8" : "min-h-[40px]"
                }`}
                onFocus={() => setIsFocused(true)}
                disabled={commentLoading}
                {...register("content", {
                  required: "Comment cannot be empty",
                  minLength: {
                    value: 3,
                    message: "Comment must be at least 3 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Comment cannot exceed 250 characters",
                  },
                })}
              />
              
            </div>
            <div className="flex flex-row justify-between items-center ml-2 mr-2">
              <span>
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
              </span>
              <span>
              {isFocused && (
                <div className="relative bottom-2 right-3 text-xs text-muted-foreground bg-background px-1">
                  {remainingChars} characters remaining
                </div>
              )}
              </span>
            </div>
            
            {isFocused && (
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    reset();
                    setIsFocused(false);
                  }}
                  disabled={commentLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={commentLoading}>
                  {commentLoading ? "Commenting..." : "Comment"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

function VideoComments() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <CommentForm />
    </div>
  );
}

export default VideoComments;
