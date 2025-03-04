import { createSlice } from '@reduxjs/toolkit';

const backupSlice = createSlice({
  name: 'backup',
  initialState: {
    backups: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchBackupsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBackupsSuccess(state, action) {
      state.loading = false;
      state.backups = action.payload;
    },
    fetchBackupsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more backup-related actions here
  },
});

export const { fetchBackupsStart, fetchBackupsSuccess, fetchBackupsFailure } = backupSlice.actions;
export default backupSlice.reducer;
