
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import toolsReducer from './toolsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tools: toolsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setCredentials'],
        ignoredPaths: ['auth.user']
      }
    })
});

export default store;
