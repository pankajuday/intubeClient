import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url.includes("/users/register")) {
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
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    if (error.response && error.response.status === 404) {
      window.location.href = "/not-found";
    }
    return Promise.reject(error);
  }
);

// Video
export const getAllVideos = async (page) => {
  try {
    const response = await axiosInstance.get(`/videos?page=${page}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// export const getVideoDetails = async (videoId) => {
//   const response = await axiosInstance.get(`/videos/${videoId}`);
//   return response.data;
// };

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
  console.log(data);
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

export const userDetail = async () => {
  try {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const channelVideos = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/videos");
    return response.data;
  } catch (error) {
    return error;
  }
};

// below all functions work for playlist functionality

export const createPlaylist = async (data) => {
  try {
    const response = await axiosInstance.post(`/`, data);
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
