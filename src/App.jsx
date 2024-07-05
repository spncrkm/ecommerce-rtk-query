import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import CreateUser from "./components/CreateUser";
import AddNewProduct from "./components/AddNewProduct";
import UserContext from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const queryClient = new QueryClient();

  const [user, setUser] = useState(() => {
    let currentUser = sessionStorage.getItem("user");
    return currentUser
      ? JSON.parse(currentUser)
      : { name: "", password: "", email: "", isLoggedIn: false };
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<CreateUser />} />
                <Route path="/products" element={<Product />} />
                <Route path="/add-product" element={<AddNewProduct />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
