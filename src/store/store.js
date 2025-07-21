import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "../components/features/orderSlice";

const store = configureStore({
  reducer: {
    orders: ordersSlice,
  },
});
export default store;
