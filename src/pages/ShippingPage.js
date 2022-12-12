import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormCheck, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'
import useDocumentTitle from '../hooks/useDocumentTitle'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ShippingAddressForm from '../components/ShippingAddressForm'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios'

const ShippingPage = () => {
  useDocumentTitle("MernShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { cart: { savedAddresses, isLoading: isCartLoading, error: cartError }, fetchUserAddresses } = useCartRedux();
  const navigate = useNavigate();
  const [ verifiedAddress, setVerifiedAddress ] = useState(null)
  const [ isAddressValid, setIsAddressValid ] = useState(false);
  const [ isDefault, setIsDefault ] = useState(false)
  const [ selectAddress, setSelectAddress ] = useState(null)
  const [ showShippingForm, setShowShippingForm ] = useState(true)

  // if not logged in, redirect to /login
  useEffect(() => {
    if(!userData) {
      navigate("/login")
    } else {
      if(savedAddresses.length === 0) fetchUserAddresses()
    }
  }, [userData])

  useEffect(() => {
    if(savedAddresses.length !== 0){
      setShowShippingForm(false)
      const defaultAddress = savedAddresses.find(item => item.isDefault)
      if(defaultAddress) setSelectAddress(defaultAddress)
    }
  }, [savedAddresses])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectAddress);
    //set as shipping address on redux
    //navigate to payment
  }
  const handleContinueButton = async () => {
    console.log({...verifiedAddress, isDefault})

    //save address to db if new.    
    if(showShippingForm){
      const addAddress = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/users/add-address`, { ...verifiedAddress, isDefault }, {             
      headers: {
      'Content-Type': 'application/json',  
      },withCredentials: true})
    } else {
      
    }

    //set as shipping address on redux
    //navigate to payment
  }
  if(isCartLoading) return <Loader/>
  if(cartError) return <Message variant="danger">{cartError}</Message>
  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>SHIPPING INFORMATION</h1>
      {!showShippingForm && <Form onSubmit={handleSubmit}>
        <h2>Saved Addresses: </h2>
        {savedAddresses.map(item => <Form.Check
            type='radio'
            id={item._id}
            key={item._id}
          >
            <Form.Check.Input type='radio' name="address" onChange={e => console.log(e.target.value)} value={item} defaultChecked={item.isDefault}/>
            <Form.Check.Label style={{ width: '100%'}}>
              <Card sz="sm" style={{ width: '', fontSize: ".9em" }} >
                <Card.Body className='p-2'>
                  <Card.Text className='mb-0'>{item.name}</Card.Text>
                  <Card.Text className='mb-0'>{item.address2} {item.address1}</Card.Text>
                  <Card.Text>{item.city}, {item.state} {item.zip5}</Card.Text>
                </Card.Body>
              </Card>
            </Form.Check.Label>
          </Form.Check>)}
          <Form.Check
            type='radio'
            id="new"
          >
          <Form.Check.Input type='radio' name="address" onChange={e => setShowShippingForm(true)} />
          <Form.Check.Label style={{ width: '100%'}}>
            <Card sz="sm" style={{ width: '', fontSize: ".9em" }} >
              <Card.Body className='p-2'>
                <Card.Text className='mb-4'>Ship to New Address</Card.Text>
              </Card.Body>
            </Card>
          </Form.Check.Label>
        </Form.Check>
        {!isAddressValid && !isCartLoading && <Button type="submit" variant="primary"  className="my-5" size="lg">Continue To Payment</Button>}
        {isCartLoading && <Loader/>}

      </Form>}
      {showShippingForm && <ShippingAddressForm setVerifiedAddress={setVerifiedAddress} setIsAddressValid={setIsAddressValid}/>}
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