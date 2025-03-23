// import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
// import { fetchVideos } from "@/axios";

// //  Rename function for better readability
// export const fetchAllVideos = createAsyncThunk("video/fetchAllVideos", async () => {
//     const response = await fetchVideos();
//     console.log("API Response:", response);
//     return response.data.docs; //  Extract only the necessary data
// });

// console.log(" fetchAllVideos Response ",fetchAllVideos)

// //  Video Slice
// const videoSlice = createSlice({
//     name: "video",
//     initialState: {
//         content: [],
//         selectedVideo: null, //  Fixed typo
//         loading: false,
//         error: null
//     },
//     reducers:{},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllVideos.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchAllVideos.fulfilled, (state, action) => {
//                 console.log("from fullfilled" , state, action)
//                 const videos = {
//                     nanoid:nanoid(),
//                     data:action.payload
//                 }
//                 state.loading = false;
//                 state.content.push(videos)
//             })
//             .addCase(fetchAllVideos.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     }
// });

// export default videoSlice.reducer;

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
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.content = [];
      })

      .addCase(fetchVideoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })

      .addCase(fetchPostVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchPostVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })

      .addCase(fetchDeleteVideoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeleteVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchDeleteVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      })

      .addCase(fetchUpdateVideoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpdateVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchUpdateVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      });
  },
});

export default videoSlice.reducer;
