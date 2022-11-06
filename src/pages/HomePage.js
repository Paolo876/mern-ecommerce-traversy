import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import useProductsRedux from "../hooks/useProductsRedux";
import Loader from "../components/Loader";
import Message from "../components/Message";
const HomePage = () => {
  const { productsList } = useProductsRedux();
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsList.error && <Message variant="danger">Error: {productsList.error}</Message>}
        {productsList.isLoading && <Loader/>}
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
