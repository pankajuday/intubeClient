import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Check if we're running in a browser that needs special handling
const isMobileBrowser = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Detect browser type for specific compatibility handling
const getBrowserType = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Brave") === -1) {
    return "chrome";
  } else if (userAgent.indexOf("Brave") > -1) {
    return "brave";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "safari";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "firefox";
  }
  return "other";
};

// Add token to localStorage backup if supported
const backupAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem("authBackupToken", token);
    }
  } catch (e) {
    console.warn("localStorage not available for token backup");
  }
};

// Get backup token if cookies fail
const getBackupToken = () => {
  try {
    return localStorage.getItem("authBackupToken");
  } catch (e) {
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const multipartEndpoints = [
      "/users/register",
      "/videos",
    ];
    
    // Add specific cookie handling for Chrome
    const browserType = getBrowserType();
    if ((browserType === "chrome" || isMobileBrowser()) && config.url !== "/users/login") {
      const backupToken = getBackupToken();
      if (backupToken) {
        config.headers["Authorization"] = `Bearer ${backupToken}`;
      }
    }
    
    if (multipartEndpoints.some(endpoint => config.url.includes(endpoint))) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Check for authentication token in response headers
    const authToken = response.headers?.authorization || 
                      response.headers?.["x-auth-token"] || 
                      response.headers?.["access-token"];
    
    if (authToken) {
      backupAuthToken(authToken);
    }
    
    // If this was a successful login, check for token in response body as fallback
    if (response.config.url === "/users/login" && response.data?.token) {
      backupAuthToken(response.data.token);
    }
    
    return response;
  },
  (error) => {
    // Handle 401 errors with a more browser-compatible approach
    if (error.response && error.response.status === 401) {
      // Clear backup token
      try {
        localStorage.removeItem("authBackupToken");
      } catch (e) {
        console.warn("Could not clear localStorage token");
      }
      
      // Don't redirect immediately for API calls that expect 401 responses
      const isApiCall = error.config.url.includes("/api/") || 
                        error.config.headers["Accept"] === "application/json";
      
      if (!isApiCall) {
        // Use a more compatible way to navigate
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    
    if (error.response && error.response.status === 404) {
      console.log(error);
      // window.location.href = "/not-found";
    }
    return Promise.reject(error);
  }
);

// Health Check

export const healthCheck = async ()=> {
  try {
    const response = await axiosInstance.get('/healthcheck');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Video
export const getAllVideos = async (page) => {
  try {
    const response = await axiosInstance.get(`/videos?page=${page}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getVideosBySearch = async (query = "", page = 1, sortBy = "createdAt", sortType = "desc") => {
  try {
    
    const queryParams = new URLSearchParams({
      page,
      sortBy,
      sortType,
    });
    
    // Only add query parameter if it exists
    if (query) {
      queryParams.append("query", query);
    }
    
    const response = await axiosInstance.get(`/videos?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const getVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/videos/${videoId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postVideo = async (data) => {
  try {
    const response = await axiosInstance.post(`/videos`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.delete(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.patch(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Auth
export const isLogin = async () => {
  try {
    const response = await axiosInstance.get("/users/islogin");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data) => {
  
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("/users/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Like
export const likeToggle = async (videoId) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const likedVideo = async () => {
  try {
    const response = await axiosInstance.get("/likes/videos");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const history = async () => {
  try {
    const response = await axiosInstance.get("/users/history");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Comment

export const getCommentsOnVideo = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllCommentsOnVideo = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const createComment = async (videoId, data) => {
  try {
    const response = await axiosInstance.post(`/comments/${videoId}`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getLikedComment = async (commentId)=> {
  try {
    const response = await axiosInstance.get(`/likes/comment/${commentId}`);
    
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const likeToggleOnComment = async(commentId)=> {
  try {
    const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
    return response.data;
  } catch (error) {
     return error.message;
  }
}

// USER

export const userDetail = async () => {
  try {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const channelVideos = async (username) => {
  try {
    const response = await axiosInstance.get(`/dashboard/videos/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// below all functions work for playlist functionality

export const createPlaylist = async (data) => {
  try {
    const response = await axiosInstance.post(`/playlist`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userPlaylist = async (userId) => {
  try {
    const response = await axiosInstance.get(`/playlist/user/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.get(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updatePlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.patch(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deletePlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addVideoOnPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlist/add/${videoId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Subscriptions

export const getSubscribedChannels = async (userId) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/u/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getUserChannelSubscribers = async (userId) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/c/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const toggleSubscription = async (userId) => {
  try {
    const response = await axiosInstance.post(`/subscriptions/c/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getChannel = async (username) => {
  try {
    const response = await axiosInstance.get(`/users/c/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default axiosInstance;
