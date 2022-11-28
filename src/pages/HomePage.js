import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import useProductsRedux from "../hooks/useProductsRedux";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  const { keyword } = useParams();
  useDocumentTitle("ProShop | Home")
  const { productsList: { error, isLoading, products } } = useProductsRedux();

  useEffect(() => {
    if(keyword){
      
    }
  }, [keyword])
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {error && <Message variant="danger">Error: {error}</Message>}
        {isLoading && <Loader/>}
        {!isLoading && products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
