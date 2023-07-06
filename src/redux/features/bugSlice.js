import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const assignBug = createAsyncThunk(
  "bug/assignBug",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const { userId, projectId, startDate, endDate } = formData;
      const response = await api.assignBug(formData);
      toast.success("Bug assigned successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBug = createAsyncThunk(
  "bug/updateBug",
  async ({ formData, id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateBug(id, formData);
      toast.success("Bug Update successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBugs = createAsyncThunk(
  "bug/getBugs",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.getBugs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterBugs = createAsyncThunk(
  "bug/filterBugs",
  async ({ formData }, { rejectWithValue }) => {
    const { userId, projectId, startDate, endDate } = formData;
    try {
      const response = await api.filterBugs(
        userId,
        projectId,
        startDate,
        endDate
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBug = createAsyncThunk(
  "bug/deleteBug",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBug(id);
      toast.success("Bug Deleted successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bugSlice = createSlice({
  name: "bug",
  initialState: {
    loading: true,
    bugs: [],
    fBugs: [],
    error: "",
  },
  extraReducers: {
    [assignBug.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [assignBug.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [assignBug.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload.message, "<-- message");
      state.error = action.payload.message;
    },
    [getBugs.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [getBugs.fulfilled]: (state, action) => {
      state.loading = false;
      state.bugs = action.payload.result;
    },
    [getBugs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBug.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [updateBug.fulfilled]: (state, action) => {
      state.loading = false;
      state.bugs = action.payload.result;
    },
    [updateBug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteBug.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [deleteBug.fulfilled]: (state, action) => {
      state.loading = false;
      state.bugs = action.payload.result;
    },
    [deleteBug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [filterBugs.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [filterBugs.fulfilled]: (state, action) => {
      state.loading = false;
      state.fBugs = action.payload.result;
    },
    [filterBugs.rejected]: (state, action) => {
      state.loading = false;
      state.fBugs = [];
      state.error = action.payload.message;
    },
  },
});

export default bugSlice.reducer;
