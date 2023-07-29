import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteCustomersService, UpdateCustomersService, getAllCustomersService } from "../../services/customerService";
const initialState = {
  isLoading: false,
  customer: [],
};
export const getAllCustomerAsync = createAsyncThunk("getAllCustomer", async () => {
  const response = await getAllCustomersService();
  return response.data;
});
export const DeleteCustomerAsync = createAsyncThunk("DeleteCustomer", async (id) => {
  const response = await DeleteCustomersService(id);
  // console.log(response);
  return response.data;
});
export const UpdateCustomerAsync = createAsyncThunk("Updatecustomer", async (params) => {
  const response = await UpdateCustomersService(params);
  return response.data;
});

export const reactCustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomerAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.customer = action.payload;
        }
      })
      .addCase(DeleteCustomerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteCustomerAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.customer = action.payload;
        }
      })
      .addCase(UpdateCustomerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateCustomerAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.customer = action.payload;
        }
      })
  },
});
export const selectCustomer = (state) => state.customer;
export default reactCustomerSlice.reducer;
