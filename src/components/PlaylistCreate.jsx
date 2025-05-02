import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatePlaylist } from "@/Redux";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function PlaylistCreate({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );
  const dispatch = useDispatch();
  const descTextCount = watch("description", "");
  const remainingChars = 250 - (descTextCount?.length || 0);

  const onSubmit = async (data) => {
    try {
      await dispatch(fetchCreatePlaylist(data)).unwrap();
      if (onClose) onClose();
      reset();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl mb-6 font-semibold">Create Playlist</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* input name  */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Playlist Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Playlist name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot exceed 30 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter playlist name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* description input  */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
                maxLength: {
                  value: 250,
                  message: "Description cannot exceed 250 characters",
                },
              })}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-0 focus:border-accent"
              placeholder="Enter playlist description"
            />
            <div className="flex flex-row justify-between items-center p-2">
            <div>
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
            </div>
            <div className="relative  text-xs text-muted-foreground bg-background px-1">
            {remainingChars} char remaining
          </div>
            </div>
          </div>
          {/* error message  */}
          {playlistError && (
            <p className="text-sm text-red-500 ">{playlistError}</p>
          )}
          
          {/* buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {/* cancel button  */}
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                onClose();
                reset();
              }}
              disabled={playlistIsLoading}
            >
              Cancle
            </Button>
            {/* submit button  */}
            <Button type="submit" disabled={playlistIsLoading}>
              {playlistIsLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PlaylistCreate;
