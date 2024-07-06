import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
       setProducts: (state, action) => {
           state.products = action.payload
       }, 
       addProductFn: (state, action) => {
        state.products.push(action.payload)
        console.log(state.products)
       }
    }
})

export const { setProducts, addProductFn } = productSlice.actions

export default productSlice.reducer