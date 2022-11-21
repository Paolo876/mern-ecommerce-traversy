import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import Message from './Message';
import { Table, Button } from 'react-bootstrap';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import currencyFormatter from "../utils/currencyFormatter";
const OrdersList = () => {
  const [ orders, setOrders ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  //fetch orders
  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:3001/api/orders`, { withCredentials: true })
    .then(res => {
        setOrders(res.data)
        setIsLoading(false)
    })
    .catch( err => {
        setError(err.message)
        setIsLoading(false)
    })
  }, [])
  console.log(orders)
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <Table striped bordered hover responsive className="table-sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>STATUS</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(item => <tr>
                <td><Link to={`/order/${item._id}`}>{item._id}</Link></td>
                <td>{new Date(item.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</td>
                <td>{currencyFormatter(item.totalAmount)}</td>
                <td>{item.isPaid ? <CheckCircleOutlineIcon style={{color: "green"}}/> : "Not Paid"}</td>
                <td>{item.orderStatus}</td>
            </tr>)}
        </tbody>
    </Table>
  )
}

export default OrdersList