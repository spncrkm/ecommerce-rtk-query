import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customers: [],
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        getCustomers: (state, action) => {
            state.customers = action.payload
        },
        deleteCustomer: (state, action) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload)
        },
        addCustomer: (state, action) => {
            state.customers = state.customers.push(action.payload)
        }
    }
})