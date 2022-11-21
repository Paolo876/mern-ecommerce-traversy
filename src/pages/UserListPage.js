import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useUserRedux from '../hooks/useUserRedux'
import axios from 'axios'

const UserListPage = () => {
  const navigate = useNavigate();
  const { user: { userData } } = useUserRedux();

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])

  //fetch users
  useEffect(()=> {
    axios.get("http://localhost:3001/api/admin/get-users", { withCredentials: true})
      .then(res => console.log(res.data))
  }, [])
  return (
    <div>UserListPage</div>
  )
}

export default UserListPage