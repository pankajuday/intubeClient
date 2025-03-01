import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userDetail } from '@/axios';

export const fetchUserDetail = createAsyncThunk('user/fetchUserDetail', async (_, thunkAPI) => {
    try {
        const response = await userDetail();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: [],
        isLoading:false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userDetail = action.payload;
            })
            .addCase(fetchUserDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;