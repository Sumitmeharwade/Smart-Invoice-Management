// redux/slices/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: [],
  reducers: {
    setCustomers: (state, action) => action.payload,
  },
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
