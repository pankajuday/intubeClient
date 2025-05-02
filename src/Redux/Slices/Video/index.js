import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteVideoById,
  getAllVideos,
  getVideoById,
  postVideo,
  updateVideoById,
} from "@/axios";

// fetcing all videos with pagenation
export const fetchAllVideos = createAsyncThunk(
  "video/get",
  async (_, thunkAPI) => {
    // Added thunkAPI
    try {
      const response = await getAllVideos();
      // console.log("API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message); // Use thunkAPI to reject
    }
  }
);

// for fetching video by id
export const fetchVideoById = createAsyncThunk(
  "video/getById",
  async (videoId, thunkAPI) => {
    try {
      const response = await getVideoById(videoId);
      // console.log("API Response fetch video by id:", response);
      // console.log("from fvbi ", videoId);

      return response.data[0];
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// for fetching related videos
export const fetchRelatedVideos = createAsyncThunk(
  "video/getRelated",
  async (videoId, thunkAPI) => {
    try {
      // Use the existing getAllVideos function but we'll filter out the current video later
      const response = await getAllVideos();
      
      // Since we might not have a specific API endpoint for related videos,
      // we'll simulate it by returning all videos except the current one
      const allVideos = response.data;
      const relatedVideos = Array.isArray(allVideos.docs) ? 
        allVideos.docs.filter(video => video._id !== videoId) : 
        [];
      
      return relatedVideos;
    } catch (error) {
      console.error("Error fetching related videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPostVideo = createAsyncThunk(
  "video/post",
  async (data, thunkAPI) => {
    try {
      const response = await postVideo(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteVideoById = createAsyncThunk(
  "video/delete",
  async (videoId, thunkAPI) => {
    try {
      const response = await deleteVideoById(videoId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateVideoById = createAsyncThunk(
  "video/update",
  async (videoId, thunkAPI) => {
    try {
      const response = await updateVideoById(videoId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const videoSlice = createSlice({
  name: "video",
  initialState: {
    content: [],
    selectedVideo: null,
    relatedVideos: [],
    videoLoading: false,
    videoError: null,
    searchResult:[]
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.content = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.content = [];
      })

      .addCase(fetchVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })
      
      // fetchRelatedVideos
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload;
        state.relatedVideos = [];
      })

      .addCase(fetchPostVideo.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchPostVideo.fulfilled, (state, action) => {
        state.videoLoading = false;
      })
      .addCase(fetchPostVideo.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; 
      })

      .addCase(fetchDeleteVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchDeleteVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchDeleteVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })

      .addCase(fetchUpdateVideoById.pending, (state) => {
        state.videoLoading = true;
        state.videoError = null;
      })
      .addCase(fetchUpdateVideoById.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchUpdateVideoById.rejected, (state, action) => {
        state.videoLoading = false;
        state.videoError = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      });
  },
});

export default videoSlice.reducer;
