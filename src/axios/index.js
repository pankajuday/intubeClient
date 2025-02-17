import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url.includes("/users/register")) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response contains cookies
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      // Split the cookies and set each one individually
      setCookieHeader.forEach(cookie => {
        const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
        Cookies.set(cookieName, cookieValue, { 
          path: '/', 
          domain: 'hello.com', // Set to your frontend domain
          secure: true, 
          sameSite: 'None' 
        });
      });
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetchVideos = async (page) => {
  const response = await axiosInstance.get(`/videos?page=${page}`);
  return response.data;
};

export const fetchVideoDetails = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data;
};

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

export const fetchVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likesToggle = async (videoId) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCommentsOnVideo = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const history = async () => {
  try {
    const response = await axiosInstance.get("/users/history");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;