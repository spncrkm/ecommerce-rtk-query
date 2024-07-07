import React, { useContext, useEffect, useState } from 'react'
import { useGetAllCustomerQuery, useDeleteCustomerMutation } from '../features/api/CustomerAPI'
import UserContext from '../context/UserContext';
import { Button } from 'react-bootstrap';

const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const { data, isError, isLoading, refetch } = useGetAllCustomerQuery();
    const [deleteCustomer ] = useDeleteCustomerMutation()
    const { newUser } = useContext(UserContext)
    console.log(data)

    
    

    const handleDelete = (id) => {
      deleteCustomer(data.filter(customer => customer.id !== id))
      console.log(id)
    }

  return (
    <div>
      <div>
        {data?.map((customer) => (
            <ul key={customer.id}>
                <li>
                    {customer.username}
                    <Button onClick={() => handleDelete(customer.id)}>Delete</Button>
                </li>
                </ul>
        ))}
      </div>
    </div>
  )
}

export default CustomerList
