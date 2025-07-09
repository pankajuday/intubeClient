import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { fetchVideoUpdate, fetchVideoById } from "@/Redux";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Save, Loader2, Upload, X } from "lucide-react";
import SpringLoader from "./SpringLoader";
import { Textarea } from "./ui/textarea";

function UpdateVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videoLoading, videoError, 
    selectedVideo
   } = useSelector((state) => state.video);
  
  const { videoId } = useParams();
  
  // File upload states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  
  // File input ref
  const thumbnailInputRef = useRef(null);
  
  // Form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
    }
  });
  
  // Fetch video details on component mount
  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoById(videoId));
    }
  }, [dispatch, videoId]);
  
  // Update form when video details are loaded
  useEffect(() => {
    if (selectedVideo) {
      reset({
        title: selectedVideo.title || "",
        description: selectedVideo.description || "",
      });
      
      // Set thumbnail preview if available
      if (selectedVideo.thumbnail) {
        setThumbnailPreview(selectedVideo.thumbnail);
      }
    }
  }, [selectedVideo, reset]);
  
  // Handle thumbnail file change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };
  
  // Clear selected thumbnail
  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(selectedVideo?.thumbnail || "");
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };
  
  // Handle form submission
  const onSubmit = (formData) => {
    const updateData = new FormData();
    
    // Add form fields to FormData
    updateData.append("title", formData.title);
    updateData.append("description", formData.description);
    
    // Add thumbnail if selected
    if (thumbnailFile) {
      updateData.append("thumbnail", thumbnailFile);
    }
    
    dispatch(fetchVideoUpdate({ data: updateData, videoId }))
      .unwrap()
      .then(() => {
        
        navigate(`/video/${videoId}`); // Navigate to video page
      })
  };

  return (
    <div className="update-video-container max-w-4xl mx-auto px-4 pb-8">
      <h1 className="text-2xl font-bold mb-6">Update Video</h1>
      
      {videoLoading && <SpringLoader />}
      
      {videoError && (
        <div className="error-container p-4 bg-red-50 text-red-600 rounded-lg mb-6">
          <p className="font-medium">Error loading video</p>
          <p>{videoError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Video Title */}
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium mb-1">Video Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        
        {/* Video Description */}
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="description"
            rows="4"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>
        
        {/* Thumbnail */}
        <div className="form-group">
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          
          <div className="thumbnail-preview mb-4">
            {thumbnailPreview ? (
              <div className="relative">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail Preview" 
                  className="w-full max-w-md h-auto rounded-lg border-2 border-gray-200" 
                />
                {thumbnailFile && (
                  <button 
                    type="button"
                    onClick={clearThumbnail}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    title="Clear selection"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <Upload size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">Upload New Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              ref={thumbnailInputRef}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleThumbnailChange}
              accept="image/*"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 1280x720 (16:9 aspect ratio)</p>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={videoLoading} 
          className="flex items-center gap-2"
        >
          {videoLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Update Video
        </Button>
      </form>
    </div>
  );
}

export default UpdateVideo;
