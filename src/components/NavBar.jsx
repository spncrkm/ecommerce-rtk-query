import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../context/UserContext";
import { Bag } from "react-bootstrap-icons"
import { Badge } from "react-bootstrap";




const NavBar = () => {
    const cartProducts = useSelector(state => state.cart.cartItems)
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="container-fluid">
          <Navbar.Brand href="#home">Redux Toolkit Project</Navbar.Brand>
          <Nav>
            <Nav.Link to="/products" as={Link}>
              Products
            </Nav.Link>
            <Nav.Link to="/add-product" as={Link}>
              Add Product
            </Nav.Link>
          </Nav>
          <div>
            <Navbar.Text className="ms-5">
              Welcome {user.name} 
            </Navbar.Text>
            <Container onClick={() => navigate('/cart')}>
              <Bag color="black" size={25}/>
              <Badge bg="warning">{cartProducts.length}</Badge>
            </Container>
            </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
