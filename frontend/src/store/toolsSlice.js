
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// 异步Thunk动作
export const fetchTools = createAsyncThunk(
  'tools/fetchTools',
  async (params, { rejectWithValue }) => {
    try {
      return await api.getTools(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedTools = createAsyncThunk(
  'tools/fetchFeaturedTools',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getFeaturedTools();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchToolById = createAsyncThunk(
  'tools/fetchToolById',
  async (id, { rejectWithValue }) => {
    try {
      return await api.getToolById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const toolsSlice = createSlice({
  name: 'tools',
  initialState: {
    tools: [],
    featuredTools: [],
    currentTool: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentTool: (state) => {
      state.currentTool = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 获取工具列表
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 获取特色工具
      .addCase(fetchFeaturedTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTools.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredTools = action.payload;
      })
      .addCase(fetchFeaturedTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 获取单个工具
      .addCase(fetchToolById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTool = action.payload;
      })
      .addCase(fetchToolById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentTool } = toolsSlice.actions;

export const selectTools = (state) => state.tools.tools;
export const selectFeaturedTools = (state) => state.tools.featuredTools;
export const selectCurrentTool = (state) => state.tools.currentTool;
export const selectToolsLoading = (state) => state.tools.loading;
export const selectToolsError = (state) => state.tools.error;

export default toolsSlice.reducer;
