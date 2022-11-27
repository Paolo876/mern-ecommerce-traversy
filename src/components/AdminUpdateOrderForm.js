import { useState } from 'react'
import { ListGroup, Button, Form, FormGroup, FormLabel, FormControl, FormCheck, Card, ListGroupItem, FormSelect } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'

const AdminUpdateOrderForm = ({ order }) => {
  const [ orderStatus, setOrderStatus ] = useState(order.orderStatus)
  const [ trackingNumber, setTrackingNumber ] = useState("")
  const [ cancelReason, setCancelReason ] = useState("")
  const [ isDelivered, setIsDelivered ] = useState(order.isDelivered)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(orderStatus, trackingNumber, cancelReason, isDelivered)
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
                        <FormSelect value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="cancelled">cancelled</option>
                        </FormSelect>
                    </FormGroup>
                    {orderStatus === "shipped" &&
                        <FormGroup controlId='name' className="my-3">
                            <FormLabel className='me-5 mt-3'><strong>Tracking number </strong><small>(optional)</small></FormLabel>
                            <FormControl type="text" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)}/>
                        </FormGroup>
                    }
                    {orderStatus === "cancelled" &&
                        <FormGroup controlId='name' className="my-3">
                            <FormLabel className='me-5 mt-3'><strong>Reason for cancellation </strong><small>(required)</small></FormLabel>
                            <FormControl as="textarea" rows={3} value={cancelReason} onChange={e => setCancelReason(e.target.value)}/>
                        </FormGroup>
                    }
                    <FormGroup controlId='name' className="my-3">
                        <FormLabel className='me-5 mt-3'><strong>Mark as Delivered: </strong></FormLabel>
                        <FormCheck inline type="checkbox" value={isDelivered} onChange={() => setIsDelivered(prevState => !prevState)} id={`inline-checkbox-1`} checked={isDelivered}/>
                    </FormGroup>
                    <div className="d-grid">
                        {!isLoading && <Button type="submit" variant="primary" size='lg' disabled={order.orderStatus === orderStatus && order.isDelivered === isDelivered}>UPDATE ORDER</Button>}
                    </div>
                </Form>
            </ListGroupItem>
        </ListGroup>
    </Card>
  )
}

export default AdminUpdateOrderForm