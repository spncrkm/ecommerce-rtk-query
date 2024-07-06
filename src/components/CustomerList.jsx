import React from 'react'
import { useGetAllCustomerQuery } from '../features/api/CustomerAPI'

const CustomerList = () => {

    const { data, isError, isLoading, refetch } = useGetAllCustomerQuery();
    console.log(data)

  return (
    <div>
        {data?.map((customer) => (
            <ul>
                <li>
                    {customer.username}
                </li>
                </ul>
        ))}
      
    </div>
  )
}

export default CustomerList
