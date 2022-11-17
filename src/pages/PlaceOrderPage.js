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

const PlaceOrderPage = () => {
    const { cart: { cartItems, shippingAddress, paymentMethod } } = useCartRedux();
    const { user: { userData } } = useUserRedux();
    const { productsList: { products }} = useProductsRedux();
    const { createOrder, clearCreatedOrder, order: { createdOrder, isLoading, error } } = useOrderRedux();
    const navigate = useNavigate();
    const [ updatedCartItems, setUpdatedCartItems ] = useState([]);

    // if not logged in, redirect to /login
    useEffect(() => {
        if(!userData) {
          navigate("/login")
        }
    }, [userData])
    // fetch product informations saved on cart
    useEffect(() => {
        fetchProductInformations( cartItems, products ).then(data => setUpdatedCartItems(data))
    }, [products, cartItems])


    useEffect(() => {
        if(createdOrder){
            navigate(`/order/${createdOrder._id}`, { state: { newOrder: true } })
        }
    }, [createdOrder]) 

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

    /**
     *  future changes:
     *      - only cartItems [{id, quantity}], shippingAddress, and paymentMethod will be submitted
     */
    const handleSubmit = () => {
      createOrder({
        orderItems: updatedCartItems.map( item => ( { _id:item._id, price:item.price, quantity: item.quantity } )), 
        shippingAddress, 
        paymentMethod,
        itemsTotalAmount,
        shippingAmount,
        taxAmount,
        totalAmount
      })
    }
    return (
    <>
        {isLoading ? <Message variant="warning">Processing order, please wait...</Message> : <CheckoutSteps step1 step2 step3 step4 />}
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h2>Shipping Address</h2>
                        <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
                    </ListGroupItem>
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
                                        <Image src={item.image} fluid rounded/>
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
                            <Button type="button" className="py-2 my-2" disabled={updatedCartItems.length === 0} size="lg" onClick={handleSubmit}>Place Order</Button>
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