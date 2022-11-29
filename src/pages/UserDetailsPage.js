import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import AdminUpdateProfileForm from '../components/AdminUpdateProfileForm';
import useUserRedux from '../hooks/useUserRedux'
import currencyFormatter from '../utils/currencyFormatter';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useDocumentTitle from '../hooks/useDocumentTitle';

const UserDetailsPage = () => {
  useDocumentTitle("Admin | User")
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: { userData } } = useUserRedux();
  const [ userDetails, setUserDetails ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //fetch user data
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/users/${id}`, { withCredentials: true })
    .then(res => {
        setUserDetails(res.data)
        setIsLoading(false)
    })
    .catch(err => {
        setError(err.Message)
        setIsLoading(false)
    })
  }, [])
  
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Row>
      {userDetails && <>
        <Col md={4}>
            <h2>USER PROFILE</h2>
            <p><strong>ID: </strong>{userDetails.user._id}</p>
            <p><strong>Name: </strong>{userDetails.user.name}</p>
            <p><strong>Email: </strong>{userDetails.user.email}</p>
            <p><strong>Member since: </strong>{new Date(userDetails.user.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</p>
        </Col>
        <Col md={8}>
          <h2>ORDERS</h2>
          {userDetails.orders.length === 0 ? <Message variant="warning">This user has no orders yet.</Message> :
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
              {userDetails.orders.map(item => <tr key={item._id}>
                <td><Link to={`/order/${item._id}`}>{item._id}</Link></td>
                <td>{new Date(item.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</td>
                <td>{currencyFormatter(item.totalAmount)}</td>
                <td>{item.isPaid ? <CheckCircleOutlineIcon style={{color: "green"}}/> : "Not Paid"}</td>
                <td>{item.orderStatus}</td>
              </tr>)}
            </tbody>
          </Table>}
        </Col>
        <AdminUpdateProfileForm user={userDetails.user}/>
      </>}
    </Row>

  )
}

export default UserDetailsPage