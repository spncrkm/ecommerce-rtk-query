import React, { useContext, useState } from "react";
import { FormText } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useAddCustomerMutation } from "../features/api/CustomerAPI";

const CreateUser = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setNewUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [addCustomer, { isLoading, isError }] = useAddCustomerMutation();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const fakeToken = "eyJhbGciOiJIUzI1NiIsInR";

      const newCustomerData = {
        name: userName,
        email: email,
        password: password,
        isLoggedIn: true,
      };

      const { data } = await addCustomer(newCustomerData);
      const userWithToken = { ...data, token: fakeToken, isLoggedIn: true };

      sessionStorage.setItem("newUser", JSON.stringify(userWithToken));
      sessionStorage.setItem("token", fakeToken);

      setNewUser(newCustomerData);
      navigate("/products");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error not loading....</h2>;
  }

  return (
    <div className="d-flex w-100 justify-content-center">
      <Form className="border rounded mt-5 p-3">
        <FormText>Register</FormText>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(event) => setUserName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Text>Already registered? </Form.Text>
          <Button
            onClick={() => {
              setShow(true);
            }}
            className="text-success bg-white p-0"
          >
            Login here
          </Button>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegisterSubmit}>
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose} className="bg-dark">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                placeholder="Username"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegisterSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateUser;
