
import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access } = action.payload;
      state.user = user;
      state.token = access;
      localStorage.setItem('accessToken', access);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await api.login(credentials);
    dispatch(setCredentials(response));
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
