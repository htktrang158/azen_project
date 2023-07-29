import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllKeyGenService } from "../../services/keyGenService";
const initialState = {
    isLoading: false,
    keyGen: [],
};
export const getAllKeyGen = createAsyncThunk("getAllKeyGen", async () => {
    const response = await getAllKeyGenService();
    return response.data;
});
export const keySlice = createSlice({
    name: "keyGen",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllKeyGen.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllKeyGen.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.keyGen = action.payload;
                }
            });
    },
});
export const selectKeyGen = (state) => state.keyGen;
export default keySlice.reducer;
