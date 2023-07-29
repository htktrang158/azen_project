import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authServices";

const initialState = {
    isLoading: false,
    userToken: {},
};
export const userLoginAsync = createAsyncThunk("authService", async (params) => {
    const response = await authService(params);
    // console.log('hahahaa',response)
    return response.data.access_token;
});
export const reactJsSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoginAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLoginAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.userToken = action.payload;
                }
            });
    },
});
export const selectUserLogin = (state) => state.userLogin;
export default reactJsSlice.reducer;
