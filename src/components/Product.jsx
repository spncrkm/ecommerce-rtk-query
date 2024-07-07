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
    <>
      <h1 className="text-center">Product Dashboard</h1>
      <div className="row">
        {products?.map((product) => (
          <div className="col-md-3 h-100 m-2" key={product.id}>
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
        ))}
      </div>
    </>
  );
};

export default Product;
