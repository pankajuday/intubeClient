import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userDetail } from '@/axios';

export const fetchUserDetail = createAsyncThunk('user/fetchUserDetail', async (userId, thunkAPI) => {
    try {
        const response = await userDetail(userId);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: null,
        isLoading:false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;