import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserService, getAllRoleService, getAllUserService } from "../../services/userService";
const initialState = {
    isLoading: false,
    users: [],
    roles:{},
    active:""
};
export const getAllUserAsync = createAsyncThunk("getAllUser", async (pages) => {
    const response = await getAllUserService(pages);
    return response.data;
});
export const CreateUserAsync = createAsyncThunk("Createuser", async (params) => {
    const response = await CreateUserService(params);
    return response.data;
});
export const UpdateUserAsync = createAsyncThunk("Updateuser", async (id) => {
    const response = await UpdateUserAsync(id);
    return response.data;
});
export const getAllRoleAsync = createAsyncThunk("getAllRole", async () => {
    const response = await getAllRoleService();
    return response.data;
});
export const getActiveAsync = createAsyncThunk("getActive", async (id) => {
    const response = await getActiveAsync(id);
    return response.data;
});
export const reactUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUserAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.users = action.payload;
                }
            })
            .addCase(UpdateUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateUserAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.users = action.payload;
                }
            })
            .addCase(CreateUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateUserAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.users = action.payload;
                }
            })
            .addCase(getAllRoleAsync.fulfilled, (state, action) => {
                state.roles = action.payload;
            })
            .addCase(getActiveAsync.fulfilled, (state, action) => {
                state.active = action.payload;
            })
    },
});
export const selectUsers = (state) => state.users;
export default reactUsersSlice.reducer;
