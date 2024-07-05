import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/api/ProductAPI";
import cartSliceReducer from "./features/cartSlice"
import { setupListeners } from "@reduxjs/toolkit/query";


// const localStorageMiddleware = store => next => action => {
//     const result = next(action);
//     localStorage.setItem('cartState', JSON.stringify(store.getState().cart))
//     return result
// }




export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
    // preloadedState: {
    //     cart: loadCartState(),
    // }
});

setupListeners(store.dispatch);