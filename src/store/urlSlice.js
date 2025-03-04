    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';
    import { apiUrl } from '../environment/environment'; // Ensure this is correctly defined

    export const fetchUrls = createAsyncThunk('urls/fetchUrls', async () => {
        const response = await axios.post(`${apiUrl}getUrl`);
        return response.data.urlList; // Extract urlList from response
    });
    

    const urlSlice = createSlice({
        name: 'urls',
        initialState: { data: [], loading: false, error: null },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchUrls.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchUrls.fulfilled, (state, action) => {
              state.loading = false;
              state.data = action.payload || []; // Ensure data is assigned correctly
            })
            .addCase(fetchUrls.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });
        },
      });
      

    export default urlSlice.reducer;
