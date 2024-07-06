import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useGetAllProductsQuery, useUpdateProductMutation } from "../features/api/ProductAPI";
import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";


const Product = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.product)

  // const [products, setProducts] = useState([]);

  const { data, isError, isLoading, refetch } = useGetAllProductsQuery();
  // const [] = useUpdateProductMutation();
  useEffect(() => {
    dispatch(setProducts(data))
  }, [data])

  const addItem = (product) => {
    dispatch(addToCart(product))
  }

  const deleteItem = (id) => {
    mutate.filter((item) => item.id !== id)
    
  }

if(isError) return <h2>Oh no error......</h2>
if(isLoading) return <h1>Loading....</h1>

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
                <Button variant="success" onClick={() => addItem(product)}>Add to Cart</Button>
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
