import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck, FormSelect } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'
import useUspsAddressVerification from '../hooks/useUspsAddressVerification'
import useDocumentTitle from '../hooks/useDocumentTitle'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import usStatesArray from '../utils/usStatesArray'
import usZipValidation from '../utils/usZipValidation'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'
import ShippingAddressForm from '../components/ShippingAddressForm'

const ShippingPage = () => {
  useDocumentTitle("MernShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { cart: { savedAddresses, isLoading: isCartLoading, error: cartError }, fetchUserAddresses } = useCartRedux();
  const navigate = useNavigate();
  const [ verifiedAddress, setVerifiedAddress ] = useState(null)
  const [ isAddressValid, setIsAddressValid ] = useState(false);
  const [ isDefault, setIsDefault ] = useState(false)

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    } else {
      if(savedAddresses.length === 0) fetchUserAddresses()
    }
  }, [userData])

  // useEffect(() =>{
  //   if(verifiedAddress){
  //     console.log(verifiedAddress)
  //     console.log(isAddressValid)

  //   }
  // }, [verifiedAddress])

  const handleContinueButton = async () => {
    console.log(verifiedAddress)
    // //save to userSchema
    // const addAddress = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/add-address`, { name, ...verifiedAddress, isDefault }, {             
    //   headers: {
    //   'Content-Type': 'application/json',  
    //   },withCredentials: true})

    // //save to session storage?
    // saveShippingAddress(addAddress.data)

  }

  if(isCartLoading) return <Loader/>
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>SHIPPING INFORMATION</h1>
      <ShippingAddressForm setVerifiedAddress={setVerifiedAddress} setIsAddressValid={setIsAddressValid}/>
      {isAddressValid && <>
        <Message variant="success">Address verified! <CheckCircleOutlineIcon/></Message>
        <FormGroup controlId='name' className="my-4">
          <span className='me-5'>Set this as your default address?</span>
          <FormCheck inline type="checkbox" value={isDefault} onChange={e => setIsDefault(prevState => !prevState)} id={`inline-checkbox-1`} checked={isDefault}/>
        </FormGroup>
        <Button variant="primary"  className="my-5" size="lg" onClick={handleContinueButton}>Continue To Payment</Button>
      </>}
    </FormContainer>
  )
}

export default ShippingPage