import { useState } from 'react'
import { ListGroup, Button, Form, FormGroup, FormLabel, FormControl, FormCheck, Card, ListGroupItem, FormSelect } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AdminUpdateOrderForm = ({ order, setOrder }) => {
  const [ orderStatus, setOrderStatus ] = useState(order.orderStatus)
  const [ trackingNumber, setTrackingNumber ] = useState(order.trackingNumber)
  const [ cancelReason, setCancelReason ] = useState(order.cancelReason)
  const [ isDelivered, setIsDelivered ] = useState(order.isDelivered)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState(null)
  const handleChangeOrderStatus = (value) => {
    setTrackingNumber("")
    setCancelReason("")
    setOrderStatus(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/orders/${order._id}/update`, {orderStatus, trackingNumber, cancelReason, isDelivered}, {withCredentials: true})
        .then(res => {
            setOrder(prevState => ({ ...prevState, ...res.data, orderItems: prevState.orderItems }))
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
  }
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Card className="mt-5 bg-warning">
        <ListGroup variant="flush">
            <ListGroupItem>
                <h2>ADMIN ACTIONS</h2>
                {success && <Message variant ="success" dismissible onClose={() => setSuccess(false)}>Successfully updated order!</Message>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup controlId='name' className="my-3">
                        <FormLabel className='me-5 mt-3'><strong>Change Order Status: </strong></FormLabel>
                        <FormSelect value={orderStatus} onChange={e => handleChangeOrderStatus(e.target.value)} disabled={isDelivered}>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="cancelled">cancelled</option>
                        </FormSelect>
                    </FormGroup>
                    {orderStatus === "shipped" &&
                        <FormGroup controlId='name' className="my-3">
                            <FormLabel className='me-5 mt-3'><strong>Tracking number </strong><small>(optional)</small></FormLabel>
                            <FormControl type="text" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} disabled={isDelivered}/>
                        </FormGroup>
                    }
                    {orderStatus === "cancelled" &&
                        <FormGroup controlId='name' className="my-3">
                            <FormLabel className='me-5 mt-3'><strong>Reason for cancellation </strong><small>(required)</small></FormLabel>
                            <FormControl as="textarea" rows={3} value={cancelReason} onChange={e => setCancelReason(e.target.value)} required disabled={isDelivered}/>
                        </FormGroup>
                    }
                    <FormGroup controlId='name' className="my-3">
                        <FormLabel className='me-5 mt-3'><strong>Mark as Delivered: </strong></FormLabel>
                        <FormCheck inline type="checkbox" value={isDelivered} onChange={() => setIsDelivered(prevState => !prevState)} id={`inline-checkbox-1`} checked={isDelivered}/>
                    </FormGroup>
                    <div className="d-grid">
                        {!isLoading && 
                            <Button 
                                type="submit" 
                                variant="primary" 
                                size='lg' 
                                disabled={order.orderStatus === orderStatus && order.isDelivered === isDelivered && order.trackingNumber === trackingNumber && order.cancelReason === order.cancelReason}
                            >
                                UPDATE ORDER
                            </Button>}
                    </div>
                </Form>
            </ListGroupItem>
        </ListGroup>
    </Card>
  )
}

export default AdminUpdateOrderForm