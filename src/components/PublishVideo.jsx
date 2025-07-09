import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostVideo } from "@/Redux";
import { Textarea } from "./ui/textarea";

const PublishVideo = () => {
  const dispatch = useDispatch();
  const { videoLoading, videoError } = useSelector((state) => state.video);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    await dispatch(fetchPostVideo(formData)).unwrap();
    reset();

    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full p-3 md:p-6 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[1000px] p-4 md:p-8 bg-white shadow-lg rounded-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
          Publish Video
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Left Side - File Uploads */}
            <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
              {/* Video File */}
              <div className="p-4 md:p-6 border-2 border-dashed border-gray-300 rounded-sm">
                <label
                  htmlFor="videoFile"
                  className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-gray-700"
                >
                  Video File
                </label>
                <input
                  type="file"
                  id="videoFile"
                  {...register("videoFile", {
                    required: "Video file is required",
                  })}
                  accept="video/*"
                  className="w-full text-sm md:text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.videoFile && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.videoFile.message}
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="p-4 md:p-6 border-2 border-dashed border-gray-300 rounded-sm">
                <label
                  htmlFor="thumbnail"
                  className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-gray-700"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  accept="image/*"
                  className="w-full text-sm md:text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side - Text Fields */}
            <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="w-full border border-gray-300 rounded-sm p-2.5 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-base md:text-lg font-medium mb-2 md:mb-3 text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border border-gray-300 rounded-sm p-2.5 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                  rows="5"
                  placeholder="Enter video description"
                ></Textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 md:mt-8">
            <button
              type="submit"
              disabled={videoLoading}
              className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[160px] md:min-w-[200px]"
            >
              {videoLoading ? "Publishing..." : "Publish Video"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {videoError && (
          <div className="mt-4 text-center text-red-500 bg-red-50 p-2.5 md:p-3 rounded-sm text-sm md:text-base">
            Error: {videoError}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishVideo;
