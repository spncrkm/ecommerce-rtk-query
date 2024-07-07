import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/api/ProductAPI";
import cartSliceReducer from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customerApi } from "./features/api/CustomerAPI";
import productSliceReducer from "./features/productSlice";


// const localStorageMiddleware = store => next => action => {
//     const result = next(action);
//     localStorage.setItem('cartState', JSON.stringify(store.getState().cart))
//     return result
// }

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    cart: cartSliceReducer,
    product: productSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(customerApi.middleware)
      
});

setupListeners(store.dispatch);
