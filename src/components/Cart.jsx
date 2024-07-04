import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../features/cartSlice'


const Cart = () => {

    const productCart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(removeFromCart(id))
    }

  return (
    <div>
      {productCart.map((product) => (
        <Card key={product.id} style={{ width: "18rem" }}>
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="danger" onClick={() => deleteItem(product.id)}>Delete</Button>
        </Card.Body>
      </Card>
      ))}
    </div>
  )
}

export default Cart
