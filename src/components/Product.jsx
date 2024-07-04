import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useGetAllProductsQuery } from "../features/api/ProductAPI";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";


const Product = () => {
    const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const { data, error, isError, isLoading, refetch } = useGetAllProductsQuery();

  const addItem = (product) => {
    dispatch(addToCart(product))
  }

  const deleteItem = (id) => {
    dispatch(removeFromCart(id))
  }

if(isError) return "Error..."
if(isLoading) return "Loading..."

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="row">
        {data?.map((product) => (
          <div className="col-md-3 h-100" key={product.id}>
            <Card style={{ width: "18rem" }}>
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
                <Button variant="primary" onClick={() => addItem(product)}>Add to Cart</Button>
                <Button variant="danger" onClick={() => deleteItem(product.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
