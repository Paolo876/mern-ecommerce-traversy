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
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const UserListPage = () => {
  useDocumentTitle("Admin | Users")
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ modalDetails, setModalDetails ] = useState({show: false, data: null});
  const [ success, setSuccess ] = useState(null);

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //fetch users
  useEffect(()=> {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/get-users`, { withCredentials: true})
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
    axios.delete(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/delete-user/${modalDetails.data._id}`, { withCredentials: true})
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
                            <Button variant='danger' className='btn-sm' onClick={() => setModalDetails({show: true, data: item})}><DeleteIcon style={{margin: "0"}}/></Button>
                        </th>
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
          handleConfirm={handleUserDelete}
        />}
    </>
  )
}

export default UserListPage