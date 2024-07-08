import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../features/api/ProductAPI";
import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, removeProduct } from "../features/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart)

  const { data, isError, isLoading } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (data) {
    dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  

  const addItem = (product) => {
    dispatch(addToCart(product));
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      dispatch(removeProduct(id));
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  if (isError) return <h2>Oh no error......</h2>;
  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="body-container">
      <h1 className="text-center">Product Dashboard</h1>
      <div className="main-container">
        {products?.map((product) => (
          <div className="container" key={product.id}>
            <div className="card__container">
            <Card style={{ width: "18rem" }} className="card-holder">
              <div className="text-center">
                <Card.Img
                  className="card-image"
                  variant="top"
                  src={product.image}
                  style={{ width: "100px", height: "130px" }}
                />
              </div>
              <Card.Body>
              <div className="card__article">
                <div className="card__data">
                  <span className="card__description">{product.description}</span>
                  <h2 className="card__title"></h2>
                  <a href="#" className="card__button">Read More</a>
                </div>
                </div>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Button variant="success" onClick={() => addItem(product)}>
                  Add to Cart
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </Card.Body>
              
            </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
