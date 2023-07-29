import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateDriversService, DeleteDriversService, getAllDriversService } from "../../services/driverServices";
const initialState = {
    isLoading: false,
    driver: [],
};
export const getAllDriverAsync = createAsyncThunk("getAllDriver", async (pages) => {
    const response = await getAllDriversService(pages);
    return response.data;
});
export const CreateDriverAsync = createAsyncThunk("CreateDriver", async (params) => {
    const response = await CreateDriversService(params);
    return response.data;
});
export const DeleteDriverAsync = createAsyncThunk("DeleteDriver", async (id) => {
    const response = await DeleteDriversService(id);
    return response.data;
});
export const reactDriversSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDriverAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDriverAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.driver = action.payload;
                }
            })
            .addCase(CreateDriverAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateDriverAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.driver = action.payload;
                }
            })
            .addCase(DeleteDriverAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteDriverAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.driver = action.payload;
                }
            })
    },
});
export const selectDrivers = (state) => state.driver;
export default reactDriversSlice.reducer;
