// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;


// import productsReducer, { productsFetch } from "./slices/productsSlice";
// import cartReducer, { getTotals } from "./slices/cartSlice";
// import { productsApi } from "./slices/productsApi";

// const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cart: cartReducer,
//     [productsApi.reducerPath]: productsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(productsApi.middleware),
// });

// store.dispatch(productsFetch());
// store.dispatch(getTotals());
