import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'
import CheckoutSteps from '../components/CheckoutSteps'
import useDocumentTitle from '../hooks/useDocumentTitle'

const ShippingPage = () => {
  useDocumentTitle("MernShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { saveShippingAddress, cart: { shippingAddress } } = useCartRedux();
  const navigate = useNavigate();

  //check for a shipping address on mount, autofill if true
  const [ name, setName ] = useState(userData.name)
  const [ address2, setAddress2 ] = useState('')
  const [ city, setCity ] = useState('')
  const [ zip5, setZip5 ] = useState('')
  const [ state, setState ] = useState('')
  const [ isDefault, setIsDefault ] = useState(false)

  const [ isAddressValid, setIsAddressValid ] = useState(false)
  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    }
  }, [userData])

  const verifyAddress = () => {
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(address.trim().length !== 0 || 
    //    city.trim().length !== 0 ||
    //    postalCode.trim().length !== 0 ||
    //    country.trim().length !== 0
    //   ) {
    //     saveShippingAddress({name, address, city, postalCode, country, isDefault})
    //     navigate("/payment")
    //   }
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>SHIPPING INFORMATION</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>Receipient Full name (First and Last name)</strong></FormLabel>
          <FormControl type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} autoComplete="address" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>Street address</strong></FormLabel>
          <FormControl type="text" placeholder="Enter street address or P.O. Box" value={address} onChange={e => setAddress(e.target.value)} autoComplete="address" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>Apt, suite, unit, building, floor, etc...</strong><span className='text-info'> (Optional)</span></FormLabel>
          <FormControl type="text" placeholder="Apt, suite, unit, building, floor, etc..." value={address} onChange={e => setAddress(e.target.value)} autoComplete="address" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>City</strong></FormLabel>
          <FormControl type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} autoComplete="city" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>State</strong></FormLabel>
          <FormControl type="text" placeholder="Enter State" value={country} onChange={e => setCountry(e.target.value)} autoComplete="country" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>Zip Code</strong></FormLabel>
          <FormControl type="text" placeholder="Enter Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} autoComplete="postalCode" disabled={isAddressValid} required/>
        </FormGroup>
        <FormGroup controlId='name' className="my-4">
          <span className='me-5'>Set this as your default address?</span>
          <FormCheck inline type="checkbox" value={isDefault} onChange={e => setIsDefault(prevState => !prevState)} id={`inline-checkbox-1`} checked={isDefault}/>
        </FormGroup>
        {!isAddressValid && <Button type="submit" variant="primary"  className="my-5">SUBMIT</Button>}
      </Form>
      {isAddressValid && <Button variant="success"  className="my-5">Continue To Payment</Button>}
    </FormContainer>
  )
}

export default ShippingPage