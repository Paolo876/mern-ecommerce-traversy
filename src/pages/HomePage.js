import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import useProductsRedux from "../hooks/useProductsRedux";

const HomePage = () => {
  const { productsList } = useProductsRedux();
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsList.error && <p>{productsList.error}</p>}
        {productsList.isLoading && <p>Loading data...</p>}
        {!productsList.isLoading && productsList.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
