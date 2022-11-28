import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import useProductsRedux from "../hooks/useProductsRedux";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  useDocumentTitle("ProShop | Home")
  const { keyword, pageNumber=1 } = useParams();
  const params = useParams();
  const { productsList: { error, isLoading, products, pages, page }, fetchProducts } = useProductsRedux();
  useEffect(() => {
    if(!products.length !== 0){
      fetchProducts({keyword, pageNumber})
    }
  }, [keyword, pageNumber])
  return (
    <>
      {!keyword && <>
        <ProductCarousel/>
        <h1>Latest Products</h1>
      </>}
      {keyword && products.length !== 0 && <h1>{`Search Results for ${keyword}:`}</h1>}
      {keyword && products.length === 0 && <h1>{`Nothing found for ${keyword}:`}</h1>}
      
      <Row>
        {error && <Message variant="danger">Error: {error}</Message>}
        {isLoading && <Loader/>}
        {!isLoading && products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword && keyword}/>
    </>
  );
};

export default HomePage;
