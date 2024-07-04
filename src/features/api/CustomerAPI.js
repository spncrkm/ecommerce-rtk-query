import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),

    endpoints: (builder) => ({
        getAllCustomer: builder.query({
            query: () => '/users'
        }),

        getOneCustomer: builder.query({
            query: (id) => `/users/${id}`
        }),

        addCustomer: builder.mutation({
            query: (newProduct) => ({
                url: '/users',
                method: 'POST',
                body: newProduct
            })
        }), 

        updateCustomer: builder.mutation({
            query: ({id, updatedItem}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: updatedItem
            })
        }),
        
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllCustomerQuery, useGetOneCustomerQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi