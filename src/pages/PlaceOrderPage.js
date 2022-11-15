import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from "../components/Message"
import CheckoutSteps from '../components/CheckoutSteps'
import useCartRedux from '../hooks/useCartRedux'
import useUserRedux from '../hooks/useUserRedux'
import useProductsRedux from '../hooks/useProductsRedux'
import fetchProductInformations from '../utils/fetchProductInformations'
const PlaceOrderPage = () => {
    const { cart: { cartItems, shippingAddress, paymentMethod } } = useCartRedux();
    const { user: { userData } } = useUserRedux();
    const { productsList: { products }} = useProductsRedux();
    const navigate = useNavigate();
    const [ updatedCartItems, setUpdatedCartItems ] = useState([]);

    // if not logged in, redirect to /login
    useEffect(() => {
        if(!userData) {
          navigate("/login")
        }
    }, [userData])

    useEffect(() => {
        fetchProductInformations( cartItems, products ).then(data => setUpdatedCartItems(data))
    }, [products, cartItems])

    return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h2>Shipping Address</h2>
                        <p>
                            {/* <strong>Address: </strong> */}
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            {/* <strong>Method: </strong> */}
                            {paymentMethod}
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Items</h2>
                        <ListGroup variant="flush">
                            {updatedCartItems.map((item, index) => (
                                <ListGroupItem key={item._id}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} fluid rounded/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item._id}`} state={{from: "/place-order"}}>{item.name}</Link>
                                    </Col>
                                    <Col md={4} style={{ textAlign: 'right' }}>
                                       {item.quantity} x ${item.price.toFixed(2)} = <strong>${parseInt(item.quantity) * parseFloat(item.price.toFixed(2))}</strong>
                                    </Col>
                                </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ 1000.00</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ 1000.00</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ 1000.00</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="py-3">
                            <Row>
                                <Col><strong>Order Total</strong></Col>
                                <Col><strong>$ 1000.00</strong></Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="py-3">
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0}>Place Order</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>

  )
}

export default PlaceOrderPage