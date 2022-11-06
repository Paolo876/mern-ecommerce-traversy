import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductPage from "./pages/ProductPage";
import useProductsRedux from "./hooks/useProductsRedux";
import CartPage from "./pages/CartPage";

const App = () => {
  const { fetchProducts } = useProductsRedux();
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route element={<HomePage />} path="/"/>
            <Route element={<ProductPage />} path="/product/:id"/>  
            <Route element={<CartPage />} path="/cart"/>  
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
