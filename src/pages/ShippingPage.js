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

const ShippingPage = () => {
  useDocumentTitle("MernShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { saveShippingAddress, cart: { shippingAddress } } = useCartRedux();
  const { isAddressValid, isLoading, error, verifyAddress, verifiedAddress } = useUspsAddressVerification();
  const navigate = useNavigate();

  //check for a shipping address on mount, autofill if true
  const [ name, setName ] = useState(userData.name)
  const [ address2, setAddress2 ] = useState('')
  const [ address1, setAddress1 ] = useState('')
  const [ city, setCity ] = useState('')
  const [ zip5, setZip5 ] = useState('')
  const [ state, setState ] = useState("none")
  const [ isDefault, setIsDefault ] = useState(false)
  const [ formError, setFormError ] = useState(null)
  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    }
  }, [userData])

  useEffect(() =>{
    if(verifiedAddress){
      setAddress2(verifiedAddress.address2)
      if(verifiedAddress.address1 !== "UNDEFINED") setAddress1(verifiedAddress.address1)
      setCity(verifiedAddress.city)
      setZip5(verifiedAddress.zip5)
      setState(verifiedAddress.state)
    }
  }, [verifiedAddress])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null)
    if(address2.trim().length === 0 ) {
      setFormError("Please Enter a Street Address")
      return
    } else if(city.trim().length === 0) {
      setFormError("Please Enter a City")
      return
    } else if(!usZipValidation(zip5)) {
      setFormError("Please Enter a Valid United States Postal code.")
      return
    } else if(state === "none") {
      setFormError("Please Select a State.")
      return
    } else {
      verifyAddress({address1, address2, city, state, zip5})
    }
  }

  const handleContinueButton = () => {
    //save to userSchema
    
    saveShippingAddress({name, ...verifiedAddress})
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>SHIPPING INFORMATION</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Message variant="warning">{error}</Message>}
        {formError && <Message variant="warning">{formError}</Message>}
        <FormGroup controlId='name' className="my-4">
          <FormLabel><strong>Receipient Full name (First and Last name)</strong></FormLabel>
          <FormControl type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} autoComplete="address" disabled={isAddressValid}/>
        </FormGroup>
        <FormGroup controlId='address2' className="my-4">
          <FormLabel><strong>Street address</strong></FormLabel>
          <FormControl type="text" placeholder="Enter street address or P.O. Box" value={address2} onChange={e => setAddress2(e.target.value)} autoComplete="address2" disabled={isAddressValid}/>
        </FormGroup>
        <FormGroup controlId='address1' className="my-4">
          <FormLabel><strong>Apt, suite, unit, building, floor, etc...</strong><span className='text-info'> (Optional)</span></FormLabel>
          <FormControl type="text" placeholder="Apt, suite, unit, building, floor, etc..." value={address1} onChange={e => setAddress1(e.target.value)} autoComplete="address1" disabled={isAddressValid}/>
        </FormGroup>
        <FormGroup controlId='city' className="my-4">
          <FormLabel><strong>City</strong></FormLabel>
          <FormControl type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} autoComplete="city" disabled={isAddressValid}/>
        </FormGroup>
        <FormGroup controlId='state' className="my-4">
          <FormLabel><strong>State</strong></FormLabel>
          <FormSelect value={state} onChange={e => setState(e.target.value)} disabled={isAddressValid}>
            <option value="none">Select State</option>
            {usStatesArray.map(item => (
              <option key={item.abbreviation} value={item.abbreviation}>{item.name} - ({item.abbreviation})</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup controlId='zip5' className="my-4">
          <FormLabel><strong>Zip Code</strong></FormLabel>
          <FormControl type="text" placeholder="Enter Zip Code" value={zip5} onChange={e => setZip5(e.target.value)} autoComplete="zip5" disabled={isAddressValid}/>
        </FormGroup>
        {!isAddressValid && !isLoading && <Button type="submit" variant="primary"  className="my-5" size="lg">SUBMIT</Button>}
        {isLoading && <Loader/>}
      </Form>

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