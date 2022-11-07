import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import useCartRedux from '../hooks/useCartRedux';
import Message from '../components/Message';


const CartPage = () => {
  const { cart:{ cartItems, isLoading, error } } = useCartRedux();
  console.log(cartItems)
  return (
    <Row>
      <Col md={8}>
        
      </Col>
      <Col md={2}>

      </Col>
      <Col md={2}>

      </Col>
    </Row>
  )
}

export default CartPage