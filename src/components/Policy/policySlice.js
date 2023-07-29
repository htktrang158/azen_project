import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllPolicyService,
  getDetailPolicyService,
  UpladFileImage,
  ExportPDF,
  GetDriver,
  GetDriverLicence,
  getAllGetforbl,
  getUserRoles,
} from "../../services/policyService";
const initialState = {
  isLoading: false,
  policy: [],
  detailPolicy: {},
  uploadImage: {},
  PDF: {},
  driver: {},
  driverLicence: {},
  Getforbl: {},
  role: {},
};
export const getAllPolicyAsync = createAsyncThunk(
  "getAllPolicy",
  async (pages) => {
    const response = await getAllPolicyService(pages);
    // console.log(response);
    return response.data;
  }
);

export const getAllGetforblAsync = createAsyncThunk(
  "getAllGetforbl",
  async () => {
    const response = await getAllGetforbl();
    // console.log(response);
    return response.data;
  }
);

export const GetDriverLicenceAsync = createAsyncThunk(
  "getAllDiverLicence",
  async () => {
    const response = await GetDriverLicence();
    // console.log(response);
    return response.data;
  }
);

export const getDetailPolicyAsync = createAsyncThunk(
  "getDetailPolicy",
  async (id) => {
    const response = await getDetailPolicyService(id);
    //console.log(response);
    return response.data;
  }
);

export const uploadImageAsync = createAsyncThunk(
  "uploadImagePolicy",
  async (params) => {
    const response = await UpladFileImage(params);
    //console.log(response);
    return response.data;
  }
);

export const ExportPDFAsync = createAsyncThunk(
  "ExportPDFAsync",
  async (params) => {
    const response = await ExportPDF(params);
    return response;
  }
);

export const DriverAsync = createAsyncThunk("getDriver", async (id) => {
  const response = await GetDriver(id);
  //console.log(response);
  return response.data;
});

export const GetAllRoleAsync = createAsyncThunk("GetAllRoleAsync", async () => {
  const response = await getUserRoles();
  // console.log(response);
  return response.data;
});

export const reactPolicySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPolicyAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPolicyAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.policy = action.payload;
        }
      })

      .addCase(getDetailPolicyAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailPolicyAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.detailPolicy = action.payload;
        }
      })

      .addCase(uploadImageAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImageAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.uploadImage = action.payload;
        }
      })

      .addCase(DriverAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DriverAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.driver = action.payload;
        }
      })

      .addCase(GetDriverLicenceAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetDriverLicenceAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.driverLicence = action.payload;
        }
      })

      .addCase(getAllGetforblAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGetforblAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.Getforbl = action.payload;
        }
      })

      .addCase(ExportPDFAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ExportPDFAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.PDF = action.payload;
        }
      })

      .addCase(GetAllRoleAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllRoleAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.role = action.payload;
        }
      });
  },
});
export const selecPolicy = (state) => state.policy;
export default reactPolicySlice.reducer;
