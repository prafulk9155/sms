import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dbReducer from './dbSlice';
import urlReducer from './urlSlice';
import cronReducer from './cronSlice';
import backupReducer from './backupSlice';
import serviceReducer from './serviceSlice';
import rdpReducer from './rdpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    db: dbReducer,
    urls: urlReducer,
    cron: cronReducer,
    backup: backupReducer,
    services: serviceReducer,
    rdps: rdpReducer

  },
});

export default store;
