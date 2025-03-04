import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../environment/environment';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const activeResponse = await axios.post(`${apiUrl}/getActiveService`, { status: "active" });
    const inactiveResponse = await axios.post(`${apiUrl}/getDeadService`, { status: "inactive" });
    
    return [...activeResponse.data.serviceList, ...inactiveResponse.data.serviceList];
});

const serviceSlice = createSlice({
    name: 'services',
    initialState: { data: [], loading: false, error: null, searchQuery: '', sortBy: 'last_updated', sortOrder: 'desc', activeTab: 'all' },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSort: (state, action) => {
            const { sortBy, sortOrder } = action.payload;
            state.sortBy = sortBy;
            state.sortOrder = sortOrder;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchQuery, setSort, setActiveTab } = serviceSlice.actions;
export default serviceSlice.reducer;
