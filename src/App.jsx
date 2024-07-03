import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {store} from './app/store'
// import { Provider } from "react-redux";
import Product from "./components/Product";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Product />} />
    </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
