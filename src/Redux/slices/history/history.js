import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHistory } from '@/axios';


export const fetchHistoryDetail = createAsyncThunk('history/fetchHistoryDetail', async (_, thunkAPI) => {
    try {
        const response = await fetchHistory();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const historySlice = createSlice({
    name: 'history',
    initialState: {
        historyDetail: null,
        isLoading:false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistoryDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHistoryDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.historyDetail = action.payload;
            })
            .addCase(fetchHistoryDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default historySlice.reducer;