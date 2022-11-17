import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'
import CheckoutSteps from '../components/CheckoutSteps'
import useDocumentTitle from '../hooks/useDocumentTitle'

const ShippingPage = () => {
  useDocumentTitle("ProShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { saveShippingAddress, cart: { shippingAddress } } = useCartRedux();
  const navigate = useNavigate();

  //check for a shipping address on mount, autofill if true
  const [ address, setAddress ] = useState((shippingAddress && shippingAddress.address) || '')
  const [ city, setCity ] = useState((shippingAddress && shippingAddress.city) || '')
  const [ postalCode, setPostalCode ] = useState((shippingAddress && shippingAddress.postalCode) || '')
  const [ country, setCountry ] = useState((shippingAddress && shippingAddress.country) || '')

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    }
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(address.trim().length !== 0 || 
       city.trim().length !== 0 ||
       postalCode.trim().length !== 0 ||
       country.trim().length !== 0
      ) {
        saveShippingAddress({address, city, postalCode, country})
        navigate("/payment")
      }
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>SHIPPING</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='name' className="my-4">
          <FormLabel>Address</FormLabel>
          <FormControl type="text" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} autoComplete="address" required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel>City</FormLabel>
          <FormControl type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} autoComplete="city" required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel>Postal Code</FormLabel>
          <FormControl type="text" placeholder="Enter Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} autoComplete="postalCode" required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel>Country</FormLabel>
          <FormControl type="text" placeholder="Enter Country" value={country} onChange={e => setCountry(e.target.value)} autoComplete="country" required/>
        </FormGroup>
        <Button type="submit" variant="primary"  className="my-5">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage