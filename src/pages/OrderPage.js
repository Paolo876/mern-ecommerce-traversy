import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, ListGroup, ListGroupItem, Image, Card } from 'react-bootstrap';
// import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"
import currencyFormatter from '../utils/currencyFormatter';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import useUserRedux from '../hooks/useUserRedux';
import fetchProductInformations from '../utils/fetchProductInformations';
import useProductsRedux from '../hooks/useProductsRedux';
import useDocumentTitle from '../hooks/useDocumentTitle';
const OrderPage = () => {
  const { state: locationState } = useLocation();
  const { user: { userData } } = useUserRedux();
  const { productsList: { products } } = useProductsRedux();
  const navigate = useNavigate();
  const params = useParams();
  const [ order, setOrder ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  useDocumentTitle( order ? `ProShop | Order ID: ${order._id}`: "ProShop" )

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    }
  }, [userData])

  //fetch order data
  useEffect(() => {
    fetchOrder()
    // addPayPalScript();
  }, [])
  const fetchOrder = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`http://localhost:3001/api/orders/${params.id}`, {withCredentials: true});
      const orderData = res.data;
      const orderItems = await fetchProductInformations(orderData.orderItems, products);
      orderData.orderItems = orderItems;
      setOrder(orderData)
      setIsLoading(false)

    } catch(err){
      setError(err.response.data.message)
      setIsLoading(false)
    }
  }
  // const addPayPalScript = async () => {
  //   const { data: clientId } = await axios.get(`http://localhost:3001/api/config/paypal`)
  //   console.log(clientId);
  // }
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  if(order) return (
    <>
      {locationState && locationState.newOrder && <Message variant="success">Your order has been placed!</Message>}
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Order Status</h2>
              {order.isDelivered ? <Message variant="success">Delivered</Message> : <p>{order.orderStatus}</p>}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Shipping Information</h2>
              <p><strong>Name:</strong> {order.shippingAddress.name}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              {order.isPaid ? 
                <Message variant="success">
                  Paid on {new Date(order.paymentResult.update_time).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}
                </Message> : 
                <Message variant="danger" opacity={75}>Not Paid</Message>}
            </ListGroupItem>
            <ListGroupItem>
                <h2>Order Items</h2>
                <ListGroup variant="flush">
                    {order.orderItems.map( item => (
                        <ListGroupItem key={item._id}>
                        <Row>
                            <Col md={1}>
                                <Image src={item.image} fluid rounded/>
                            </Col>
                            <Col>
                                <Link to={`/product/${item._id}`} state={{from: `/order/${order._id}`}}>{item.name}</Link>
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
          <Card>
              <ListGroup variant="flush">
                  <ListGroupItem>
                      <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                      <Row>
                          <Col>Items</Col>
                          <Col className="text-end pe-3">{currencyFormatter(order.itemsTotalAmount)}</Col>
                      </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                      <Row>
                          <Col>Shipping</Col>
                          <Col className="text-end pe-3">{currencyFormatter(order.shippingAmount)}</Col>
                      </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                      <Row>
                          <Col>Tax (6.5%)</Col>
                          <Col className="text-end pe-3">{currencyFormatter(order.taxAmount)}</Col>
                      </Row>
                  </ListGroupItem>
                  <ListGroupItem className="py-3">
                      <Row>
                          <Col><strong>Order Total</strong></Col>
                          <Col className="text-end pe-3"><strong>{currencyFormatter(order.totalAmount)}</strong></Col>
                      </Row>
                  </ListGroupItem>
              </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage