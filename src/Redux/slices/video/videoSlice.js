// import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
// import { fetchVideos } from "@/axios";

// // ✅ Rename function for better readability
// export const fetchAllVideos = createAsyncThunk("video/fetchAllVideos", async () => {
//     const response = await fetchVideos();
//     console.log("API Response:", response);
//     return response.data.docs; // ✅ Extract only the necessary data
// });

// console.log(" fetchAllVideos Response ",fetchAllVideos)

// // ✅ Video Slice
// const videoSlice = createSlice({
//     name: "video",
//     initialState: {
//         content: [],
//         selectedVideo: null, // ✅ Fixed typo
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
import { fetchVideos, fetchVideoById } from "@/axios";

export const fetchAllVideos = createAsyncThunk(
  "video/fetchAllVideos",
  async (_, thunkAPI) => {
    // Added thunkAPI
    try {
      const response = await fetchVideos();
      console.log("API Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message); // Use thunkAPI to reject
    }
  }
);

export const fetchVideoByIdSlice = createAsyncThunk(
  "video/fetchVideoById",
  async (videoId, thunkAPI ) => {
    try {
      const response = await fetchVideoById(videoId);
      console.log("API Response fetch video by id:", response);
      console.log("from fvbi ", videoId);

      return response.data[0];
    } catch (error) {
      console.error("Error fetching videos:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    content: [],
    selectedVideo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.content = [];
      })
      .addCase(fetchVideoByIdSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoByIdSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoByIdSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Access the payload from rejectWithValue
        state.selectedVideo = [];
      });
  },
});

export default videoSlice.reducer;
