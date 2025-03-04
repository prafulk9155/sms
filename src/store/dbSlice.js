import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../environment/environment';
// Async Thunk to fetch databases
export const fetchDatabases = createAsyncThunk('db/fetchDatabases', async () => {
  const data = axios.post(`${apiUrl}/getDBStatus`).then((response) => response.data.DBList || []);
  return data;
});

const dbSlice = createSlice({
  name: 'db',
  initialState: {
    databases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatabases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.loading = false;
        state.databases = action.payload;
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dbSlice.reducer;