import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {store} from './app/store'
// import { Provider } from "react-redux";
import Product from "./components/Product";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
