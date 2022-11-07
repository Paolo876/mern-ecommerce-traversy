import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl } from 'react-bootstrap';
import useCartRedux from '../hooks/useCartRedux';
import Message from '../components/Message';


const CartPage = () => {
  const { cart:{ cartItems, isLoading, error }, changeCartItemQuantity } = useCartRedux();

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {cartItems.length === 0 ? 
          <Message>You have no items in your cart. <Link to="/">Back to Home</Link></Message> : 
          <ListGroup>
            {cartItems.map(item => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                  <Col md={3}><Link to={`/product/${item._id}`}>{item.name}</Link></Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>                                            
                    <FormControl as="select" value={item.quantity} onChange={e => changeCartItemQuantity({...item, quantity: e.target.value})}>
                      {[...Array(item.countInStock).keys()].map(item => (
                          <option key={item + 1} value={item + 1}>{item + 1}</option>
                      ))}
                    </FormControl>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        }
      </Col>
      <Col md={2}>

      </Col>
      <Col md={2}>

      </Col>
    </Row>
  )
}

export default CartPage