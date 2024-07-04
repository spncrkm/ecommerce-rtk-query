import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/api/ProductAPI";
import cartSliceReducer from "./features/cartSlice"


export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
})