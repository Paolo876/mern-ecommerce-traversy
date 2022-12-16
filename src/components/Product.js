import { Card, Image, Carousel, CarouselItem } from "react-bootstrap";
import Rating from "./Rating";
import { Link, useLocation } from "react-router-dom";

const Product = ({ product }) => {
  const location = useLocation();

  return (
    <Card className="my-3 p-3 rounded" style={{height: "30rem"}}>
      <Link to={`/product/${product._id}`} state={{from: location.pathname}} style={{overflow: "hidden"}}>
      {/* <Image src={product.image.url} variant="top" fluid style={{objectFit: "cover", height:"100%", width: "100%"}}/> */}

      <Carousel variant="dark" interval={null}>
          <CarouselItem><Image src={product.image.url} variant="top" fluid style={{objectFit: "cover", height:"100%", width: "100%"}}/></CarouselItem>
          {product.additionalImages.map(item => <CarouselItem key={item._id}>
            <Image src={item.url} variant="top" fluid style={{objectFit: "cover", height:"100%", width: "100%"}}/>
          </CarouselItem>)}
      </Carousel>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} state={{from: location.pathname}}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
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
