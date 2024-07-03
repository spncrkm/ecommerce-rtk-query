import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => todo.id !== action.payload)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartItem.reducers

// products.jsx
// onClick = handleFn
// import { useDispatch } from "react-redux";
// const dispatch =
// handleFn() {
//     dispatch(addToCart(product))
// }