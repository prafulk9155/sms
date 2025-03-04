import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../environment/environment';

// Correct action type
export const fetchRDPs = createAsyncThunk('rdps/fetchRDPs', async () => {
    const response = await axios.post(`${apiUrl}/getRDPList`);
    return response.data.RDPList || []; // Ensure array is returned
});

const rdpSlice = createSlice({
    name: 'rdps',
    initialState: { data: [], loading: false, error: null },
    reducers: {
        deleteRDP: (state, action) => {
            state.data = state.data.filter(rdp => rdp.id !== action.payload);
        },
        toggleRDPStatus: (state, action) => {
            const rdp = state.data.find(r => r.id === action.payload);
            if (rdp) {
                rdp.isActive = !rdp.isActive;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRDPs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRDPs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || [];
            })
            .addCase(fetchRDPs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { deleteRDP, toggleRDPStatus } = rdpSlice.actions;
export default rdpSlice.reducer;
