import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostVideo } from "@/Redux";
import SpringLoader from "./SpringLoader";
import { postVideo } from "@/axios";

const PublishVideo = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.video);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", data.videoFile[0]);
      formData.append("thumbnail", data.thumbnail[0]);

      await postVideo(data);
      alert("Video published successfully!");
      reset(); // Reset the form after successful submission
    } catch (err) {
      console.error("Error uploading video:", err);
      alert("An error occurred. Please try again.");
    }
    console.log(data);
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-sm">
      <h1 className="text-3xl font-bold text-center mb-6">Publish Video</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter video title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter video description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Video File */}
        <div>
          <label htmlFor="videoFile" className="block text-lg font-medium mb-2">
            Video File
          </label>
          <input
            type="file"
            id="videoFile"
            {...register("videoFile", { required: "Video file is required" })}
            accept="video/*"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.videoFile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.videoFile.message}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className="block text-lg font-medium mb-2">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            {...register("thumbnail", { required: "Thumbnail is required" })}
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Publish
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
    </div>
  );
};

export default PublishVideo;
