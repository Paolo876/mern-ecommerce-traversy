import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import UpdateProfileForm from '../components/UpdateProfileForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import OrdersList from '../components/OrdersList';

const ProfilePage = () => {
  useDocumentTitle("ProShop | Profile")
  const { user: { userData } } = useUserRedux();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ isUserProfile, setIsUserProfile ] = useState(false);
  const [ profileData, setProfileData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  //redirect user if not logged in.
  useEffect(() => {
    if(!userData){
      navigate("/login", {state:{ from: `/profile/${id}`, error: "You must be logged in to continue." }})
    } else {}
  }, [userData])

  // run on param change/mount
  useEffect(() => {
    if(!profileData) {
      setIsLoading(true)
      axios.get(`http://localhost:3001/api/users/profile/${id}`, { withCredentials: true})
      .then( res => {
        const data = res.data;
        data._id === id ? setIsUserProfile(true) : setIsUserProfile(false);
        setIsLoading(false)
        setProfileData(data);
      })
      .catch(() => {
        setError("Failed to fetch data.")
        setIsLoading(false)
      })
    }
    return () => {
      setProfileData(null)
      setIsUserProfile(false)
      setError(null)
    }
  }, [id])


  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader/>}
      {profileData && <Col md={3}>
        <h2>USER PROFILE</h2>
        <p>{profileData.name}</p>
        <p>Member since {new Date(profileData.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'})}</p>
      </Col>}
      {isUserProfile && 
      <>
        <Col md={5}>
          <h2>MY ORDERS</h2>
          <OrdersList/>
        </Col>
        <UpdateProfileForm/>
      </>
      }
    </Row>
  )
}

export default ProfilePage