import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useUserRedux from '../hooks/useUserRedux'

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: { userData } } = useUserRedux();
  

  // if not logged in or not an admin, redirect
  useEffect(() => {
    if(!userData) navigate("/login")
    if(userData && !userData.isAdmin) navigate("/")
  }, [userData])
  
  console.log(id);
  return (
    <div>ProductDetailsPage</div>
  )
}

export default ProductDetailsPage