import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import useProductsRedux from "../hooks/useProductsRedux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import DocumentHead from "../components/DocumentHead";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const {state: locationState} = useLocation();
  const { keyword, pageNumber=1 } = useParams();
  const { productsList: { error, isLoading, products, pages, page }, fetchProducts } = useProductsRedux();
  useEffect(() => {
    if(!(locationState && locationState.from === "product") || products.length === 0){
      fetchProducts({keyword, pageNumber})
    }
  }, [keyword, pageNumber])
  return (
    <>
      <DocumentHead
        title="MernShop | Home"
        description="We sell electronics and devices for the best price"
        keyword="video game, phone, electronics, iphone, computer, gadgets"
      />
      {!keyword && pageNumber.toString() === "1" &&
        <>
          <ProductCarousel/>
          <h1>Latest Products</h1>
        </>
      }
      {keyword && products.length !== 0 && <h1>{`Search Results for ${keyword}:`}</h1>}
      {keyword && products.length === 0 && <h1>{`Nothing found for ${keyword}:`}</h1>}
      
      <Row>
        {error && <Message variant="danger">Error: {error}</Message>}
        {isLoading && <Loader/>}
        {/* {!isLoading && products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))} */}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword && keyword}/>
    </>
  );
};

export default HomePage;
