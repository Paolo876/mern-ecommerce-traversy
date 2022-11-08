import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl } from 'react-bootstrap';
import useCartRedux from '../hooks/useCartRedux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cart:{ cartItems, isLoading, error }, changeCartItemQuantity, removeFromCart } = useCartRedux();

  const handleCheckout = () => {
    console.log(cartItems);
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {cartItems.length === 0 ? 
          <Message>You have no items in your cart yet. <Link to="/">Back to Home Page</Link></Message> : 
          <ListGroup variant="flush">
            {error && <Message variant="danger">Error: {error}</Message>}
            {isLoading && <Loader/>}

            {!isLoading && cartItems.map(item => (
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
                  <Col md={2}><Button type="button" variant="light" onClick={() => removeFromCart(item._id)}><DeleteIcon style={{margin: 0}}/></Button></Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        }
      </Col>
      <Col md={4}>
        {cartItems.length !== 0 &&
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Subtotal: ({cartItems.reduce(( acc, item) => parseInt(acc) + parseInt(item.quantity), 0)}) Items</h2>
                ${cartItems.reduce(( acc, item) => parseFloat(acc) + parseInt(item.quantity) * parseFloat(item.price), 0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={handleCheckout}>
                  Proceed To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        }
      </Col>
    </Row>
  )
}

export default CartPage