import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../context/UserContext";
import { Bag } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";

const NavBar = () => {
  const cartProducts = useSelector((state) => state.cart.itemCount);
  const { newUser, setNewUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("newUser");
    sessionStorage.removeItem("token");
    setNewUser({ name: "", password: "", email: "", isLoggedIn: false });
    navigate("/")
  }
  

  return (
    <div className="sticky-top">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="container-fluid">
          <Navbar.Brand as={Link} to='/'>Redux Toolkit Project</Navbar.Brand>
          <Nav className="me-auto">
              <>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/add-product">
                  Add Product
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Customers
                </Nav.Link>
              </>
          </Nav>
          <div className="d-flex align-items-center">
            <Navbar.Text className="me-3">
              Welcome {newUser.isLoggedIn ? newUser.name : "Guest"}
            </Navbar.Text>
            {newUser.isLoggedIn && (
              <div onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
                <Bag color="black" size={25} />
                <Badge bg="warning">{cartProducts}</Badge>
              </div>
            )}
            {newUser.isLoggedIn && (
              <button className="btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;