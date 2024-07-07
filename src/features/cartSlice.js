import { createSlice } from "@reduxjs/toolkit";

// export const loadCartState = () => {
//     const cartState = localStorage.getItem('cartState')
//     return cartState ? JSON.parse(cartState) : initialState;
// }


const initialState = {
    cartItems: [],
    totalCost: 0,
    orderCount: 0,
    itemCount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id);
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({...action.payload, quantity: 1})
            }
            state.totalCost += action.payload.price
            state.itemCount += 1;
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.totalCost -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
                state.itemCount -= state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex, 1);
            }
        },
        getTotalCost: (state) => {
            state.totalCost = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1;
                state.totalCost += existingItem.price;
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id)
            if(existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.totalCost -= existingItem.price;
            } else if (existingItem && existingItem.quantity === 1) {
                state.totalCost -= existingItem.price;
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
            }
        },
        resetCart: (state) => {
            state.cartItems = [];
            state.totalCost = 0;
            state.orderCount += 1;
            state.itemCount = 0;
          },
    }
})

export const { addToCart, removeFromCart, getTotalCost, incrementQuantity, decrementQuantity, resetCart } = cartSlice.actions

export default cartSlice.reducer

// products.jsx
// onClick = handleFn
// import { useDispatch } from "react-redux";
// const dispatch =
// handleFn() {
//     dispatch(addToCart(product))
// }