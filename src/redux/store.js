import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../components/Login/userSlice";
import orderSlice from "../components/Home/orderSlice";
import policySlice from "../components/Policy/policySlice";
import customerSlice from "../components/Customers/customerSlice";
import driverSlice from "../components/Drivers/driverSlice";
import usersSlice from "../components/Register/registerSlice";

export const store = configureStore({
  reducer: {
    userLogin: userSlice,
    orderDelivery: orderSlice,
    policy: policySlice,
    customer: customerSlice,
    driver: driverSlice,
    users: usersSlice
  }
})
