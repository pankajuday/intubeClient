import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCommentsOnVideo } from "@/axios";


export const fetchCommentsOnVideo = createAsyncThunk("comment/fetchCommentsOnVideo",async (videoId, thunkApi)=>{
    try {
        const response = await getAllCommentsOnVideo(videoId);
        return response;

    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
});

const commentSlice = createSlice({
    name: "comment",
    initialState:{
        commentData:[],
        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCommentsOnVideo.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchCommentsOnVideo.fulfilled, (state, action)=>{
            state.isLoading = false
            state.commentData = action.payload
        })
        .addCase(fetchCommentsOnVideo.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default commentSlice.reducer;