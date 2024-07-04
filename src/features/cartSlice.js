import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer

// products.jsx
// onClick = handleFn
// import { useDispatch } from "react-redux";
// const dispatch =
// handleFn() {
//     dispatch(addToCart(product))
// }