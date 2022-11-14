import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import useUserRedux from "./hooks/useUserRedux";
import useCartRedux from "./hooks/useCartRedux";
import useProductsRedux from "./hooks/useProductsRedux";
// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";

const App = () => {
  const { fetchProducts } = useProductsRedux();
  const { user: { userData, isLoading }, authorizeToken } = useUserRedux();
  const { fetchCartItems } = useCartRedux();
  useEffect(() => {
    fetchProducts()
    authorizeToken()
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
          {isLoading ? <Loader/> :
            <Routes>
                <Route element={<HomePage />} path="/"/>
                <Route element={<ProductPage />} path="/product/:id"/>  
                <Route element={<CartPage />} path="/cart"/>  
                <Route element={<LoginPage />} path="/login"/>  
                <Route element={<RegisterPage />} path="/register"/>  
                <Route element={<ProfilePage />} path="/profile/:id"/>  
                <Route element={<ShippingPage />} path="/shipping"/>  
            </Routes>}
          </Container>
        </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
