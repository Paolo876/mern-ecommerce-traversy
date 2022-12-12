import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from "../components/Message"
import CheckoutSteps from '../components/CheckoutSteps'
import useCartRedux from '../hooks/useCartRedux'
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from '../hooks/useProductsRedux'
import useOrderRedux from '../hooks/useOrderRedux'
import fetchProductInformations from '../utils/fetchProductInformations'
import currencyFormatter from '../utils/currencyFormatter'
import Loader from '../components/Loader'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from 'axios';
import PayPalCheckout from '../components/PayPalCheckout'

const PlaceOrderPage = () => {
    useDocumentTitle("MernShop | Place Order")
    const { cart: { cartItems, shippingAddress, paymentMethod } } = useCartRedux();
    const { user: { userData } } = useUserRedux();
    const { productsList: { products }} = useProductsRedux();
    const { createOrder, order: { createdOrder, isLoading, error } } = useOrderRedux();
    const navigate = useNavigate();

    const [ updatedCartItems, setUpdatedCartItems ] = useState([]);
    const [ paymentResult, setPaymentResult ] = useState(null)

    // if not logged in, redirect to /login
    useEffect(() => {
        if(!userData) {
          navigate("/login")
        }
        if(!shippingAddress) {
            navigate("/shipping")
        }
        if(userData && shippingAddress){
            //axios request here for computation
            fetchOrderCost();
        }
    }, [userData, shippingAddress])

    // fetch product informations saved on cart
    useEffect(() => {
        fetchProductInformations( cartItems, products ).then(data => setUpdatedCartItems(data))
    }, [products, cartItems])

    useEffect(() => {
        if(createdOrder){
            navigate(`/order/${createdOrder._id}`, { state: { newOrder: true } })
        }
    }, [createdOrder]) 

    useEffect(() => {
        if(paymentResult && paymentResult.status === "COMPLETED"){
            createOrder({
                orderItems: updatedCartItems.map( item => ( { _id:item._id, price:item.price, quantity: item.quantity } )), 
                shippingAddress, 
                paymentMethod,
                itemsTotalAmount,
                shippingAmount,
                taxAmount,
                totalAmount,
                paymentResult,
                isPaid: paymentResult ? true : false
              })
        }
    }, [paymentResult])
    /**
     *  future changes:
     *      - these variables will be fetched & computed on backend.
     */
    //calculate total items cost
    const itemsTotalAmount = (updatedCartItems.reduce(( acc, item) => parseFloat(acc) + parseInt(item.quantity) * parseFloat(item.price), 0).toFixed(2)) || 0
    //calculate shipping cost (mock)
    const shippingAmount = 0
    //calculate tax cost (mock)
    const taxAmount = itemsTotalAmount * .065
    const totalAmount = parseFloat(itemsTotalAmount) + parseFloat(shippingAmount) + parseFloat(taxAmount);

    const fetchOrderCost = async () => {
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/order-actions/cost-summary`, shippingAddress , { withCredentials: true})
      console.log(res);
    }
    /**
     *  future changes:
     *      - shippingAddress, and paymentMethod will be submitted
     */
    // const handleSubmit = () => {
    //   createOrder({
    //     orderItems: updatedCartItems.map( item => ( { _id:item._id, price:item.price, quantity: item.quantity } )), 
    //     shippingAddress, 
    //     paymentMethod,
    //     itemsTotalAmount,
    //     shippingAmount,
    //     taxAmount,
    //     totalAmount,
    //     paymentResult,
    //     isPaid: true
    //     // isPaid: paymentResult ? true : false
    //   })
    // }
    return (
    <>
        {isLoading ? <Message variant="warning">Processing order, please wait...</Message> : <CheckoutSteps step1 step2 step3 step4 />}
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    {shippingAddress && <ListGroupItem>
                        <h2>Shipping Information</h2>
                        <p><strong>Name: </strong>{shippingAddress.name}</p>
                        <p><strong>Address: </strong>{shippingAddress.address2} {shippingAddress.address1}, {shippingAddress.city} {shippingAddress.state} {shippingAddress.zip5}</p>
                    </ListGroupItem>}
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>{paymentMethod}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Items</h2>
                        <ListGroup variant="flush">
                            {updatedCartItems.map( item => (
                                <ListGroupItem key={item._id}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image.thumbnail} alt={item.image.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item._id}`} state={{from: "/place-order"}}>{item.name}</Link>
                                    </Col>
                                    <Col md={4} style={{ textAlign: 'right' }}>
                                       {item.quantity} x {currencyFormatter(item.price)} = <strong>{currencyFormatter(parseInt(item.quantity) * parseFloat(item.price.toFixed(2)))}</strong>
                                    </Col>
                                </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
            {isLoading ? <Loader/> :
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col className="text-end pe-3">{currencyFormatter(itemsTotalAmount)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col className="text-end pe-3">{currencyFormatter(shippingAmount)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax (6.5%)</Col>
                                <Col className="text-end pe-3">{currencyFormatter(taxAmount)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="py-3">
                            <Row>
                                <Col><strong>Order Total</strong></Col>
                                <Col className="text-end pe-3"><strong>{currencyFormatter(totalAmount)}</strong></Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="d-grid gap-2 py-3">
                            {error && <Message variant="danger">{error}</Message>}
                            {/* <Button type="button" className="py-2 my-2" disabled={updatedCartItems.length === 0} size="lg" onClick={handleSubmit}>Place Order</Button> */}
                            <PayPalCheckout orderTotal={totalAmount} disabled={updatedCartItems.length === 0} setPaymentResult={setPaymentResult}/>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            }
            </Col>
        </Row>
    </>

  )
}

export default PlaceOrderPage