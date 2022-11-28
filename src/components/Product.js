import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";
const Product = ({ product }) => {
  const location = useLocation();
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`} state={{from: location.pathname}}>
        <Card.Img src={product.image.url} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} state={{from: location.pathname}}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* {product.reviews.length !== 0 && */}
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
        </Card.Text>
        {/* } */}
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};



Rating.defaultProps = {
    color:"orange"
}

// //props typechecking
// Rating.propTypes = {
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string
// }
export default Product;
