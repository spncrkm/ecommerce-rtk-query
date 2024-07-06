import React, { useState } from 'react'
import { useAddProductMutation } from '../features/api/ProductAPI'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProductFn } from '../features/productSlice';

const AddNewProduct = () => {

    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const [addProduct, {data, error, isLoading}] = useAddProductMutation();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const handleClose = () => setModalShow(false);

    if (error) {
        return <h2>Error</h2>
    }
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    const handleAddProduct = async (event) => {
        event.preventDefault();
        try {
            const newProductData = {
                title: productName,
                price: price,
            }
            dispatch(addProductFn(newProductData))
            addProduct(newProductData)


        } catch (error) {
            console.error("Error adding new product:", error)
        }
        setModalShow(true)
    }

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
        <h4>{data?.title}</h4>
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
