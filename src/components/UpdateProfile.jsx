import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateAccount, fetchUpdateAvatar, fetchUpdateCoverImage, fetchUserDetail } from "@/Redux";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import SpringLoader from "./SpringLoader";
import { Camera, Save, X } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/Notification/Toast";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { isLoading, error, userDetail } = useSelector(state => state.user);
  
  // Tab state
  const [activeTab, setActiveTab] = useState("account"); // "account", "avatar", "cover"
  
  // File upload states
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  
  // File input refs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  
  // Forms
  const accountForm = useForm({
    defaultValues: {
      fullName: "",
      email: ""
    }
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = accountForm;
  
  // Load user details on component mount
//   useEffect(() => {
//     dispatch(fetchUserDetail());
//   }, [dispatch]);
  
  // Load user details on component mount
  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  // Update form when user details are loaded
  useEffect(() => {
    if (userDetail) {
      // Update account form data
      reset({
        fullName: userDetail.fullName || "",
        email: userDetail.email || ""
      });
      
      // Set previews if available
      if (userDetail.avatar) {
        setAvatarPreview(userDetail.avatar);
      }
      
      if (userDetail.coverImage) {
        setCoverPreview(userDetail.coverImage);
      }
    }
  }, [userDetail, reset]);
  
  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle account form submission
  const onAccountSubmit = (data) => {
    dispatch(fetchUpdateAccount(data))
      .unwrap()
      .then(() => {
        showSuccessToast("Account details updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update account details");
      });
  };
  
  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };
  
  // Handle cover file change
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };
  
  // Submit avatar update
  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    
    if (!avatarFile) {
      showErrorToast("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    
    dispatch(fetchUpdateAvatar(formData))
      .unwrap()
      .then(() => {
        showSuccessToast("Avatar updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
        setAvatarFile(null);
        if (avatarInputRef.current) {
          avatarInputRef.current.value = "";
        }
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update avatar");
      });
  };
  
  // Submit cover image update
  const handleCoverSubmit = (e) => {
    e.preventDefault();
    
    if (!coverFile) {
      showErrorToast("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("coverImage", coverFile);
    
    dispatch(fetchUpdateCoverImage(formData))
      .unwrap()
      .then(() => {
        showSuccessToast("Cover image updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
        setCoverFile(null);
        if (coverInputRef.current) {
          coverInputRef.current.value = "";
        }
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update cover image");
      });
  };
  
  // Clear selected avatar
  const clearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(userDetail?.avatar || "");
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
  };
  
  // Clear selected cover image
  const clearCover = () => {
    setCoverFile(null);
    setCoverPreview(userDetail?.coverImage || "");
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  return (
    <div className="update-profile-container max-w-4xl mx-auto pt-24 px-4 pb-8">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      
      {/* Tab Navigation */}
      <div className="tab-navigation flex mb-6 border-b">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === "account" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleTabChange("account")}
        >
          Account Details
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === "avatar" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleTabChange("avatar")}
        >
          Profile Picture
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === "cover" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleTabChange("cover")}
        >
          Cover Image
        </button>
      </div>
      
      {isLoading && <SpringLoader />}
      
      {/* Error Display */}
      {error && (
        <div className="error-message bg-red-50 text-red-600 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Account Details Form */}
      {activeTab === "account" && (
        <div className="account-details-form">
          <form onSubmit={handleSubmit(onAccountSubmit)} className="space-y-4">
            <div className="form-group">
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                id="fullName"
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            

            
            <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
              <Save size={16} /> Update Account Details
            </Button>
          </form>
        </div>
      )}
      
      {/* Avatar Update Form */}
      {activeTab === "avatar" && (
        <div className="avatar-form">
          <div className="avatar-preview mb-6 flex justify-center">
            {avatarPreview ? (
              <div className="relative">
                <img 
                  src={avatarPreview} 
                  alt="Avatar Preview" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200" 
                />
                {avatarFile && (
                  <button 
                    onClick={clearAvatar}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    title="Clear selection"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <form onSubmit={handleAvatarSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="avatar" className="block text-sm font-medium mb-1">Select Profile Picture</label>
              <input
                id="avatar"
                type="file"
                ref={avatarInputRef}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleAvatarChange}
                accept="image/*"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: Square image, 300x300px or larger</p>
            </div>
            
            <Button type="submit" disabled={isLoading || !avatarFile} className="flex items-center gap-2">
              <Save size={16} /> Update Profile Picture
            </Button>
          </form>
        </div>
      )}
      
      {/* Cover Image Update Form */}
      {activeTab === "cover" && (
        <div className="cover-image-form">
          <div className="cover-preview mb-6">
            {coverPreview ? (
              <div className="relative">
                <img 
                  src={coverPreview} 
                  alt="Cover Preview" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200" 
                />
                {coverFile && (
                  <button 
                    onClick={clearCover}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    title="Clear selection"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <form onSubmit={handleCoverSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="coverImage" className="block text-sm font-medium mb-1">Select Cover Image</label>
              <input
                id="coverImage"
                type="file"
                ref={coverInputRef}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleCoverChange}
                accept="image/*"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 1200x300px, landscape orientation</p>
            </div>
            
            <Button type="submit" disabled={isLoading || !coverFile} className="flex items-center gap-2">
              <Save size={16} /> Update Cover Image
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
