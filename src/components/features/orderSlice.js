import { createSlice } from "@reduxjs/toolkit";

// default state of slice
const initialState = {
  orders: [], // array will hold list of orders
  selectedOrder: null, // stores the currently selected orders & show them on UI
};

// create slice is helper function which automatically generate action creators & avoid the need of switch cases
const orderSlice = createSlice({
  name: "orders",
  initialState,

  // reducer is a function & create automitically create actions
  reducers: {
    // trigger when list of orders fetch from (json)
    setOrders: (state, action) => {
      state.orders = action.payload;
      if (action.payload.length > 0) {
        //first order is selected bydefault
        state.selectedOrder = action.payload[0];
      }
    },

    // trigger when user click on other order from list
    selectOrder: (state, action) => {
      // specific order
      state.selectedOrder = action.payload;
    },
  },
});

// exporting setOrders & selectOrder actions creators  automatically created by createSlice
export const { setOrders, selectOrder } = orderSlice.actions;

// it is reducer function that will be use in redux store
export default orderSlice.reducer;

// orders :	Holds the array of all orders
// selectedOrder :	Tracks the currently selected order
// setOrders	: Loads orders & auto-selects first
// selectOrder	: Selects a specific order for display
// createSlice	: Simplifies action & reducer creation
