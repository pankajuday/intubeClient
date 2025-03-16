import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { channelVideos } from "@/axios";

export const  fetchAllChannelVideos = createAsyncThunk("deshboard/fetchAllChannelVideos", async (_,thunkApi)=>{
    try {
        const response = await channelVideos();
        return response.data;
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
});

const deshboardSlice = createSlice({
    name:"deshboard",
    initialState:{
        dashboardData :[],
        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllChannelVideos.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllChannelVideos.fulfilled, (state,action)=>{
            state.isLoading = false
            state.dashboardData = action.payload;
        })
        .addCase(fetchAllChannelVideos.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload

        })
    }

});

export default deshboardSlice.reducer;
