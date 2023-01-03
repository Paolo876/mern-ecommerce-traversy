import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl } from 'react-bootstrap';
import useCartRedux from '../hooks/useCartRedux';
import useUserRedux from '../hooks/useUserRedux';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import currencyFormatter from '../utils/currencyFormatter';

const CartPage = () => {
  useDocumentTitle("MernShop | Cart")
  const { cart:{ cartItems, isLoading, error }, changeCartItemQuantity, removeFromCart } = useCartRedux();
  // const { productsList: { products }} = useProductsRedux();
  const { user: {userData} } = useUserRedux();
  const [ updatedCartItems, setUpdatedCartItems ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(cartItems.length !== 0 && !updatedCartItems){
      axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/cart/cart-items-information`, { cartItems }, { withCredentials: true })
      .then(res => setUpdatedCartItems(res.data))
    }
    if(cartItems.length === 0  && !updatedCartItems) setUpdatedCartItems([])
  }, [ cartItems, updatedCartItems ]) 

  const handleChangeQuantity = ( payload ) => {
    changeCartItemQuantity(payload);  //redux dispatch
    setUpdatedCartItems(prevState => {
      const updatedItems = [ ...prevState]
      updatedItems.find(item => item._id === payload._id).quantity = payload.quantity
      return updatedItems;
    })
  }
  /* if product hasOption, the id of the selectedOption is passed  */
  const handleRemoveFromCart = (id) => {  
    removeFromCart(id) //redux dispatch
    setUpdatedCartItems(prevState => prevState.filter(item => item.hasOption ? item.selectedOption._id !== id : item._id !== id))
  }
  
  const handleCheckout = () => {
    // if not logged in, redirect to /login
    if(!userData) {
      navigate("/login", { state: { from: "/cart", error: "You must be logged in to checkout." } })
    } else {
      navigate("/shipping")
    }
  } 
  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {updatedCartItems &&
        <>
          {error && <Message variant="danger">Error: {error}</Message>}
          {isLoading && <Loader/>}
          {!isLoading && updatedCartItems &&
          <>
            {updatedCartItems.length === 0 ? <Message>You have no items in your cart yet. <Link to="/">Back to Home Page</Link></Message> :
              <ListGroup variant="flush">
                {updatedCartItems.map(item => (
                  <ListGroupItem key={item.hasOption ? item.selectedOption._id : item._id}>
                    <Row>
                      <Col md={2} xs={3} className="px-0"><Image src={item.hasOption ? item.selectedOption.image.thumbnail : item.image.thumbnail} alt={item.hasOption ? item.selectedOption.image.name: item.image.name} fluid rounded></Image></Col>
                      <Col md={3} xs={9} ><Link to={`/product/${item._id}`} state={{from: "/cart"}}>{item.name} {item.hasOption && `- ${item.selectedOption.name}`}</Link></Col>
                      <Col md={{span: 2, offset: 1}} xs={{span: 3, offset: 5}}>{item.hasOption ? currencyFormatter(item.selectedOption.price) : currencyFormatter(item.price)}</Col>
                      <Col md={2} xs={2}>                                            
                        <FormControl as="select" value={item.quantity} onChange={e => handleChangeQuantity({...item, quantity: e.target.value})}>
                          {[...Array(item.hasOption ? parseInt(item.selectedOption.countInStock) : parseInt(item.countInStock)).keys()].map(item => (
                              <option key={item + 1} value={item + 1}>{item + 1}</option>
                          ))}
                        </FormControl>
                      </Col>
                      <Col md={2} xs={2}><Button type="button" variant="light" onClick={() => handleRemoveFromCart(item.hasOption ? item.selectedOption._id : item._id)}><DeleteIcon style={{margin: 0}}/></Button></Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            }
          </>
          }
        </>}
      </Col>
      <Col md={4}>
        {updatedCartItems && updatedCartItems.length !== 0 &&
          <Card className='mt-3'>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2 className='mb-3'>Subtotal: ({updatedCartItems.reduce(( acc, item) => parseInt(acc) + parseInt(item.quantity), 0)}) Items</h2>
                {currencyFormatter(updatedCartItems.reduce(( acc, item) => parseFloat(acc) + parseInt(item.quantity) * (item.hasOption ? parseFloat(item.selectedOption.price): parseFloat(item.price)), 0))}
                <br/><small><em>* taxes and shipping costs will be calculated upon checkout.</em></small>

              </ListGroupItem>
              <ListGroupItem>
                <Button type="button" className="btn-block mt-3" disabled={updatedCartItems.length === 0} onClick={handleCheckout} size="lg">
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