import { useState, useEffect } from "react";
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
import CustomerList from "./components/CustomerList";


function App() {
  const queryClient = new QueryClient();

  const [newUser, setNewUser] = useState(() => {
    const currentUser = sessionStorage.getItem("newUser");
    const currentToken = sessionStorage.getItem("token");
    return currentUser && currentToken
      ? {...JSON.parse(currentUser), token: currentToken, isLoggedIn: true}
      : { name: "", password: "", email: "", isLoggedIn: false };
  });

  useEffect(() => {
    const currentUser = sessionStorage.getItem("newUser");
    const currentToken = sessionStorage.getItem("token");
    if (currentUser && currentToken) {
      setNewUser({ ...JSON.parse(currentUser), token: currentToken, isLoggedIn: true });
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserContext.Provider value={{ newUser, setNewUser }}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<CreateUser />} />
                <Route path="/users" element={<CustomerList />} />
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
