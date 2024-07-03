import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useGetAllProductsQuery } from "../features/api/ProductAPI";

const Product = () => {
  const [products, setProducts] = useState([]);

  const { data, error, isError, isLoading, refetch } = useGetAllProductsQuery();
    

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const result = await axios.get("https://fakestoreapi.com/products");
  //     setProducts(result.data);
  //   };
  //   fetchProducts();
  // }, [])
  

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
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
