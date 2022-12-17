import { Card, Image, Carousel, CarouselItem } from "react-bootstrap";
import Rating from "./Rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import productOptionsPrices from "../utils/productOptionsPrices";
import currencyFormatter from "../utils/currencyFormatter";
const Product = ({ product }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageStyleProps = { objectFit: "cover", height:"100%", width: "100%", cursor: "pointer" }
  const handleClick = () => {
    navigate(`/product/${product._id}`, {state: {from: location.pathname}})
  }
  return (
    <Card className="my-3 p-3 rounded" style={{height: "30rem"}}>
      <Carousel variant="dark" interval={null} fade controls={false} className="product-carousel">
          <CarouselItem><Image src={product.image.url} variant="top" fluid style={imageStyleProps} onClick={handleClick}/></CarouselItem>
          {product.additionalImages.map(item => <CarouselItem key={item._id}>
            <Image src={item.url} variant="top" fluid style={imageStyleProps} onClick={handleClick}/>
          </CarouselItem>)}
      </Carousel>

      <Card.Body>
        <Link to={`/product/${product._id}`} state={{from: location.pathname}}>
          <Card.Title as="div" className="mt-4">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h5">{product.hasOptions ? `${productOptionsPrices(product.productOptions)}` : `${currencyFormatter(product.price)}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};


// //props typechecking
// Rating.propTypes = {
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string
// }
export default Product;
