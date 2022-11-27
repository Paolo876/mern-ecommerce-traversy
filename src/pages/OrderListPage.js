import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import useUserRedux from '../hooks/useUserRedux'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PromptModal from '../components/PromptModal'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import currencyFormatter from "../utils/currencyFormatter"
const OrderListPage = () => {
  useDocumentTitle("Admin | Orders")
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ orders, setOrders ] = useState([]);
  const [ modalDetails, setModalDetails ] = useState({show: false, data: null});
  const [ success, setSuccess ] = useState(null);

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //fetch orders
  useEffect(()=> {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/admin/orders", { withCredentials: true})
      .then(res => {
        setOrders(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])
  console.log(orders);
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <>
        {success && <Message variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Message>}
        <h1>Users</h1>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>STATUS</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(item => (
                    <tr key={item._id}>
                        <th><Link to={`/user-details/${item._id}`}>{item._id}</Link></th>
                        <th><span><strong>Name: </strong>{item.user.name}</span> | <span><strong>ID: </strong><Link to={`/user-details/${item.user._id}`}>{item.user._id}</Link></span></th>
                        <th>{new Date(item.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</th>
                        <th>{currencyFormatter(item.totalAmount)}</th>
                        <th>{item.isPaid ? <CheckCircleOutlineIcon style={{color: "green"}}/> : <CloseIcon style={{color: "red"}}/>}</th>
                        <th>{item.orderStatus}</th>
                        <th>{item.isDelivered ? <CheckCircleOutlineIcon style={{color: "green"}}/> : <CloseIcon style={{color: "red"}}/>}</th>
                        <th><Link to={`/user-details/${item._id}`}><Button><EditIcon style={{margin: "0"}}/></Button></Link></th>
                    </tr>
                ))}
            </tbody>
        </Table>
        {modalDetails.show && <PromptModal 
          title={"Are you sure you want to delete this user?"}
          bodyInfo={[
            {label: "ID", description: modalDetails.data._id},
            {label: "Name", description: modalDetails.data.name},
            {label: "Email", description: modalDetails.data.email}
          ]}
          modalDetails={modalDetails} 
          setModalDetails={setModalDetails} 
          // handleConfirm={handleUserDelete}
        />}
    </>
  )
}

export default OrderListPage