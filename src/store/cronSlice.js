import { createSlice } from '@reduxjs/toolkit';

const cronSlice = createSlice({
  name: 'cron',
  initialState: {
    crons: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCronsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCronsSuccess(state, action) {
      state.loading = false;
      state.crons = action.payload;
    },
    fetchCronsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more cron-related actions here
  },
});

export const { fetchCronsStart, fetchCronsSuccess, fetchCronsFailure } = cronSlice.actions;
export default cronSlice.reducer;
