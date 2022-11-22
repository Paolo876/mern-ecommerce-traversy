import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useUserRedux from '../hooks/useUserRedux'
import axios from 'axios'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import UserListModal from '../components/UserListModal'
const UserListPage = () => {
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ modalDetails, setModalDetails ] = useState({show: false, user: null});
  const [ success, setSuccess ] = useState(null);

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //fetch users
  useEffect(()=> {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/admin/get-users", { withCredentials: true})
      .then(res => {
        setUsers(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  //delete user
  const handleUserDelete = () => {
    setIsLoading(true)
    axios.delete(`http://localhost:3001/api/admin/delete-user/${modalDetails.user._id}`, { withCredentials: true})
      .then(res => {
        setSuccess(res.data.message)
        setUsers(prevState => prevState.filter(item => item._id !== res.data.id))
        setModalDetails({show: false, user: null})
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
        {success && <Message variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Message>}
        <h1>Users</h1>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>isADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(item => (
                    <tr key={item._id}>
                        <th>{item._id}</th>
                        <th>{item.name}</th>
                        <th><a href={`mailto: ${item.email}`} target="_blank" rel="noreferrer" >{item.email}</a></th>
                        <th>{item.isAdmin ? <CheckCircleOutlineIcon/> : <CloseIcon/> }</th>
                        <th>
                            <LinkContainer to={`/user/${item._id}/edit`}>
                                <Button variant='light' className='btn-sm'><EditIcon style={{margin: "0"}}/></Button>
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

export default UserListPage