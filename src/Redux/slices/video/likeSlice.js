import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { likesToggle, likedVideo  } from "@/axios";


export const likesToggleSlice = createAsyncThunk("like/likesToggleSlice", async(videoId, thunkApi)=>{
    try {
        const response = await likesToggle(videoId);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})
export const likesVideoSlice = createAsyncThunk("like/likesVideoSlice", async(videoId, thunkApi)=>{
    try {
        const response = await likesToggle(videoId);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

const likeSlice = createSlice({
    name:"like",
    initialState:{
        likeData:[],
        isLoading:false,
        error:null
    },
    extraReducers:(builder)=>{
            builder
            // for likesToggleSlice
            .addCase(likesToggleSlice.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(likesToggleSlice.fulfilled,(state, action)=>{
                state.isLoading = false
                state.likeData = action.payload

            })
            .addCase(likesToggleSlice.rejected,(state, action)=>{
                state.isLoading = true
                state.error = action.payload

            })
            // for likesVideoSlice
            .addCase(likesVideoSlice.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(likesVideoSlice.fulfilled,(state, action)=>{
                state.isLoading = false
                state.likeData = action.payload

            })
            .addCase(likesVideoSlice.rejected,(state, action)=>{
                state.isLoading = true
                state.error = action.payload

            })
    }
})

export default likeSlice.reducer;