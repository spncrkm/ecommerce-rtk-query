import React, { useState } from 'react'
import { useAddProductMutation, useGetAllProductsQuery } from '../features/api/ProductAPI'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProductFn } from '../features/productSlice';

const AddNewProduct = () => {

    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [addProduct, {isLoading, error}] = useAddProductMutation();
    const { refetch } = useGetAllProductsQuery()
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const handleClose = () => setModalShow(false);

    

    const handleAddProduct = async (event) => {
        event.preventDefault();
        try {
            const newProductData = {
                title: productName,
                price: price
            };
            const result = await addProduct(newProductData).unwrap();
            console.log("New product added:", result)
            dispatch(addProductFn(result))
            refetch();
            setModalShow(true)
        } catch (error) {
            console.error("Error adding new product:", error)
        }
    };
    if (error) {
      return <h2>Error</h2>
  };
  if (isLoading) {
      return <h2>Loading...</h2>
  };

  return (
    <div>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control onChange={(event) => setProductName(event.target.value)} type="text" placeholder="Product Name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={(event) => setPrice(event.target.value)} type="text" placeholder="Price" />
      </Form.Group>
      <Button onClick={handleAddProduct} disabled={isLoading} variant='success'>Add New Product</Button>
    </Form>
    <Modal
    show={modalShow}
    onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thank You!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{productName}</h4>
        <p>
          Has been successfully added!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
    
  )
}

export default AddNewProduct
