import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createDeliveryOrderService,
    deleteDeliveryOrderService,
    downloadImageService,
    getAccountDeliveryOrderService,
    getAllDeliveryOrderService,
    getDetailDeliveryOrderService,
    getSaleStaffService,
    loadImageService,
    updateDeliveryOrderService,
    uploadImageService,
} from "../../services/orderDeliveryService";
const initialState = {
    isLoading: false,
    deliveryOrder: {},
    saleStaff: [],
    allDeliveryOrder: [],
    imageProduct: [],
};
export const getAllDeliveryOrder = createAsyncThunk("getAllDeliveryOrder", async (pages) => {
    const response = await getAllDeliveryOrderService(pages);
    return response.data.result;
});
export const getDetailDeliveryOrder = createAsyncThunk("getDetailDeliveryOrder", async (id) => {
    const response = await getDetailDeliveryOrderService(id);
    return response.data;
});
export const getAccountDeliveryOrder = createAsyncThunk("getAccountDeliveryOrder", async (id) => {
    const response = await getAccountDeliveryOrderService(id);
    return response.data;
});
export const deleteDeliveryOrder = createAsyncThunk("deleteDeliveryOrder", async (id) => {
    const response = await deleteDeliveryOrderService(id);
    return response.data;
});
export const createDeliveryOrder = createAsyncThunk("createDeliveryOrder", async (params) => {
    const response = await createDeliveryOrderService(params);
    console.log(response.data);
    return response.data;
});
export const updateDeliveryOrder = createAsyncThunk("updateDeliveryOrder", async (params) => {
    const response = await updateDeliveryOrderService(params);
    console.log(response.data);
    return response.data;
});
export const getSaleStaff = createAsyncThunk("getSaleStaff", async () => {
    const response = await getSaleStaffService();
    return response.data;
});
export const getImageProduct = createAsyncThunk("getImageProduct", async (data) => {
    const response = await loadImageService(data);
    return response.data.result;
});
export const postImageProduct = createAsyncThunk("postImageProduct", async (data) => {
    const response = await uploadImageService(data);
    return response.data;
});
export const downloadImageProduct = createAsyncThunk("downloadImageProduct", async (data) => {
    const response = await downloadImageService(data);
    console.log(response.data);
    return response.data;
});
export const orderDeliverySlice = createSlice({
    name: "orderDelivery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDeliveryOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDeliveryOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.allDeliveryOrder = action.payload;
                }
            })
            .addCase(getDetailDeliveryOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDetailDeliveryOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                    state.deliveryOrder = action.payload;
                }
            })
            .addCase(getAccountDeliveryOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAccountDeliveryOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLoading = false;
                }
            })
            .addCase(getSaleStaff.fulfilled, (state, action) => {
                state.saleStaff = action.payload;
            })
            .addCase(updateDeliveryOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDeliveryOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliveryOrder = action.payload;
            })
            .addCase(createDeliveryOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDeliveryOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deliveryOrder = action.payload;
            })
            .addCase(getImageProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getImageProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.imageProduct = action.payload;
            });
    },
});
export const selectOrderDelivery = (state) => state.orderDelivery;
export default orderDeliverySlice.reducer;
