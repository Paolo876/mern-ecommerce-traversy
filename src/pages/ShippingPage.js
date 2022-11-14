import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'

const ShippingPage = () => {
  const { user: { userData } } = useUserRedux();
  const { saveShippingAddress, cart: { shippingAddress } } = useCartRedux();
  const navigate = useNavigate();

  //check for a shipping address on mount, autofill if true
  const [ address, setAddress ] = useState(shippingAddress && shippingAddress.address || '')
  const [ city, setCity ] = useState(shippingAddress && shippingAddress.city || '')
  const [ postalCode, setPostalCode ] = useState(shippingAddress && shippingAddress.postalCode || '')
  const [ country, setCountry ] = useState(shippingAddress && shippingAddress.country || '')

  // //check for a shipping address on mount, autofill if true
  // useEffect(() => {
  //   if(shippingAddress) {
  //     setAddress(shippingAddress.address)
  //     setCity(shippingAddress.city)
  //     setPostalCode(shippingAddress.postalCode)
  //     setCountry(shippingAddress.country)
  //   }
  // }, [])

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    } else {
      navigate("/shipping")
    }
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress({address, city, postalCode, country})
    navigate("/payment")
  }
  return (
    <FormContainer>
      <h1>Shipping</h1>
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