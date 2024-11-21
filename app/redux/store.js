// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './slices/invoiceSlice';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    customers: customerReducer,
    products: productReducer,
  },
});

export default store;
