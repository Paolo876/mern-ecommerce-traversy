import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import ProductPage from "./pages/ProductPage";
import useProductsRedux from "./hooks/useProductsRedux";
import CartPage from "./pages/CartPage";
import useUserRedux from "./hooks/useUserRedux";
import useCartRedux from "./hooks/useCartRedux";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { fetchProducts } = useProductsRedux();
  const { user: { userData } } = useUserRedux();
  const { fetchCartItems } = useCartRedux();
  useEffect(() => {
    fetchProducts()
  }, [])

  //if user, check for cart items
  useEffect(() => {
    if(userData){
      fetchCartItems(userData._id);
    } else {
      fetchCartItems();
    }
  }, [userData])
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route element={<HomePage />} path="/"/>
            <Route element={<ProductPage />} path="/product/:id"/>  
            <Route element={<CartPage />} path="/cart"/>  
            <Route element={<LoginPage />} path="/login"/>  
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
