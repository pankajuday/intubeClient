import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddVideoOnPlaylist, fetchUserPlaylist } from "@/Redux";
import { showErrorToast, showSuccessToast } from "@/Notification/Toast";
import SpringLoader from "./SpringLoader";
import { useForm } from "react-hook-form";

function AddToPlaylist({ videoId, userId, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      playlistId: "",
    },
  });

  const dispatch = useDispatch();
  const { playlistData, playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    try {
      if (videoId && userId) {
        if(playlistData.length === 0){
            dispatch(fetchUserPlaylist(userId));
        }
      }
    } catch (error) {
      showErrorToast(error?.message);
    }
  }, [videoId, userId]);


  const onSubmitForm = async (data) => {
    console.log(data)
    if (!userId) {
      showErrorToast("Please login to add to playlist");
      return;
    }

    if (!data.playlistId || !videoId) {
      showErrorToast("Invalid playlist or video selection");
      return;
    }

    try {
      await dispatch(fetchAddVideoOnPlaylist({ videoId, playlistId: data.playlistId })).unwrap();
      reset(); 
      onClose(); 
    } catch (error) {
      showErrorToast(error?.message || "Failed to add video to playlist");
    }
  };

  const selectedPlaylist = watch("playlistId");

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">
          Save to playlist
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-6">
          <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select playlist
          </p>
          <div className="space-y-2">
            {playlistIsLoading ? (
              <SpringLoader />
            ) : (
              playlistData?.map((playlist) => (
                <label
                  key={playlist._id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={playlist._id}
                    {...register("playlistId", {
                      required: "Please select a playlist",
                    })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-slate-700"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {playlist.name}
                  </span>
                </label>
              ))
            )}
          </div>
          {errors.playlistId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.playlistId.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none"
          >
            Cancel
          </button>{" "}
          <button            type="submit"
            disabled={!selectedPlaylist || isSubmitting}
            className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
              !selectedPlaylist || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddToPlaylist;
