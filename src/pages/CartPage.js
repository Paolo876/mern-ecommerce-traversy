import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl } from 'react-bootstrap';
import useCartRedux from '../hooks/useCartRedux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import useProductsRedux from '../hooks/useProductsRedux';

const fetchProductInformations = async ( cartItems, products ) => {
  let _cartItems = [];
  for (const item of cartItems) {
    const product = products.find(product => product._id === item._id)
    if(product) {
      _cartItems.push({...product, quantity: item.quantity})
    } else {
      const res = await axios.get(`http://localhost:3001/api/products/${item._id}`);
      if(res && res.data) _cartItems.push({...res.data, quantity: item.quantity})
    }
  }
  return _cartItems;
}
const CartPage = () => {
  const { cart:{ cartItems, isLoading, error }, changeCartItemQuantity, removeFromCart } = useCartRedux();
  const { productsList: { products }} = useProductsRedux();
  const [ updatedCartItems, setUpdatedCartItems ] = useState([]);

  useEffect(() => {
    if(updatedCartItems.length === 0) {
      if( products.length !== 0 && cartItems.length !== 0 ) {
        fetchProductInformations( cartItems, products ).then(data => setUpdatedCartItems(data))
      }
    }
  }, [products, cartItems])

  const handleChangeQuantity = ( payload ) => {
    changeCartItemQuantity(payload);  //redux dispatch
    setUpdatedCartItems(prevState => {
      const updatedItems = [ ...prevState]
      updatedItems.find(item => item._id === payload._id).quantity = payload.quantity
      return updatedItems;
    })
  }

  const handleRemoveFromCart = (id) => {
    removeFromCart(id) //redux dispatch
    setUpdatedCartItems(prevState => prevState.filter(item => item._id !== id))
  }
  const handleCheckout = () => {
    console.log(cartItems);   //use cartItems, --only grab id and quantity
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {updatedCartItems.length === 0 ? 
          <Message>You have no items in your cart yet. <Link to="/">Back to Home Page</Link></Message> : 
          <ListGroup variant="flush">
            {error && <Message variant="danger">Error: {error}</Message>}
            {isLoading && <Loader/>}

            {!isLoading && updatedCartItems.map(item => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                  <Col md={3}><Link to={`/product/${item._id}`}>{item.name}</Link></Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>                                            
                    <FormControl as="select" value={item.quantity} onChange={e => handleChangeQuantity({...item, quantity: e.target.value})}>
                      {[...Array(item.countInStock).keys()].map(item => (
                          <option key={item + 1} value={item + 1}>{item + 1}</option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}><Button type="button" variant="light" onClick={() => handleRemoveFromCart(item._id)}><DeleteIcon style={{margin: 0}}/></Button></Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        }
      </Col>
      <Col md={4}>
        {updatedCartItems.length !== 0 &&
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Subtotal: ({updatedCartItems.reduce(( acc, item) => parseInt(acc) + parseInt(item.quantity), 0)}) Items</h2>
                ${updatedCartItems.reduce(( acc, item) => parseFloat(acc) + parseInt(item.quantity) * parseFloat(item.price), 0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type="button" className="btn-block" disabled={updatedCartItems.length === 0} onClick={handleCheckout}>
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