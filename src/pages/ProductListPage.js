import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useUserRedux from '../hooks/useUserRedux'
import axios from 'axios'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import UserListModal from '../components/PromptModal'
import { Link } from 'react-router-dom'
import useProductsRedux from "../hooks/useProductsRedux"

const ProductListPage = () => {
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const { productsList: { products } } = useProductsRedux();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ modalDetails, setModalDetails ] = useState({show: false, user: null});
  const [ success, setSuccess ] = useState(null);

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //delete product
  const handleUserDelete = () => {
    setIsLoading(true)
    axios.delete(`http://localhost:3001/api/admin/delete-user/${modalDetails.user._id}`, { withCredentials: true})
      .then(res => {
        setSuccess(res.data.message)
        setUsers(prevState => prevState.filter(item => item._id !== res.data.id))
        setModalDetails({show: false, data: null})
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
      })
  }

  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error.message}</Message>
  return (
    <>
        {/* <Row></Row> */}
        {success && <Message variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Message>}
        <h1>Users</h1>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>isADMIN</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {users.map(item => (
                    <tr key={item._id}>
                        <th><Link to={`/user-details/${item._id}`}>{item._id}</Link></th>
                        <th>{item.name}</th>
                        <th><a href={`mailto: ${item.email}`} target="_blank" rel="noreferrer" >{item.email}</a></th>
                        <th>{item.isAdmin ? <CheckCircleOutlineIcon/> : <CloseIcon/> }</th>
                        <th className='p-2'>
                            <LinkContainer to={`/user-details/${item._id}`}>
                                <Button variant='primary' className='btn-sm me-2'><EditIcon style={{margin: "0"}}/></Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => setModalDetails({show: true, user: item})}><DeleteIcon style={{margin: "0"}}/></Button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </Table>
        {modalDetails.show && <UserListModal 
          modalDetails={modalDetails} 
          setModalDetails={setModalDetails} 
          handleUserDelete={handleUserDelete}
        />}
    </>
  )
}

export default ProductListPage