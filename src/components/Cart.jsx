import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity, resetCart } from "../features/cartSlice";

const Cart = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productCart = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalCost);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const jsonCartItems = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', jsonCartItems);
  }, [cartItems])

  const deleteItem = (id) => {
    dispatch(removeFromCart({id}));
  };

  const incrementItem = (id) => {
    dispatch(incrementQuantity({id}))
  };

  const decrementItem = (id) => {
    dispatch(decrementQuantity({id}))
  };

  const handleOrder = () => {
    dispatch(resetCart());
    handleClose();
    setTimeout(() => {
      alert("Thank you for shopping with us!")
    }, 1500);
  };

  return (
    <div>
      <>
        <div className="d-flex justify-content-end m-5">
          <div className="col-md-3">
          <Button variant="primary" onClick={handleShow}>
            Place Order
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Check out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productCart.map((product) => (
                <ul key={product.id}>
                  <li>
                    {product.title} x {product.quantity}
                  </li>
                </ul>
              ))}
              <h5>Total: ${total.toFixed(2)}</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleOrder}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
        </div>
      </>
      <div className="d-grid">
        <div className="row gap-3">
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
            <Card.Text>{product.description}
            </Card.Text>
              <br/>
              <div className="d-flex justify-content-end pt-2">
              Quantity:
              <Button variant="outline-primary" className="btn-sm me-2 ms-2" onClick={() => decrementItem(product.id)}>-</Button>
              {product.quantity}
              <Button variant="outline-primary" className="btn-sm ms-2" onClick={() => incrementItem(product.id)}>+</Button>
            <Button className="ms-4" variant="danger" onClick={() => deleteItem(product.id)}>
              Delete
            </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      </div>
      </div>
    </div>
  );
};

export default Cart;
