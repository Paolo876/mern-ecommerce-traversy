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
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CreateProductPage from "./pages/CreateProductPage";
import OrderListPage from "./pages/OrderListPage";

const App = () => {
  const { fetchProducts } = useProductsRedux();
  const { user: { userData, isLoading, isAuthReady }, authorizeToken } = useUserRedux();
  const { fetchCartItems } = useCartRedux();
  
  useEffect(() => {
      authorizeToken()
  }, [])

  //if user, check for cart items
  useEffect(() => {
    if(isAuthReady){
      fetchProducts()
      if(userData){
        fetchCartItems(userData._id);
      } else {
        fetchCartItems();
      }
    }
  }, [userData, isAuthReady])
  if(!isAuthReady) return <Loader/>

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
                <Route element={<PaymentPage />} path="/payment"/>  
                <Route element={<PlaceOrderPage />} path="/place-order"/>  
                <Route element={<OrderPage />} path="/order/:id"/>  
                {/* ADMIN ROUTES */}
                <Route element={<UserListPage />} path="/user-list"/>  
                <Route element={<UserDetailsPage />} path="/user-details/:id"/>  
                <Route element={<ProductListPage />} path="/product-list"/>  
                <Route element={<ProductDetailsPage />} path="/product-details/:id"/>  
                <Route element={<CreateProductPage />} path="/create-product"/>  
                <Route element={<OrderListPage />} path="/order-list"/>  
            </Routes>}
          </Container>
        </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
