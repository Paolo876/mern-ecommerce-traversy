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

const ShippingPage = () => {
  useDocumentTitle("MernShop | Shipping")
  const { user: { userData } } = useUserRedux();
  const { cart: { savedAddresses, isLoading: isCartLoading, error: cartError, shippingAddress }, fetchUserAddresses, saveShippingAddress, shipToNewAddress } = useCartRedux();
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
      if(shippingAddress) {
        setSelectAddress(shippingAddress)
      } else if(defaultAddress) {
        setSelectAddress(defaultAddress)
      }
    }
  }, [savedAddresses])

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress(selectAddress) //set as shipping address on redux
    navigate("/payment") //navigate to payment
  }

  const handleContinueButton = async () => {
    shipToNewAddress({ ...verifiedAddress, isDefault })
    navigate("/payment")
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
          <Form.Check.Input 
            type='radio' 
            name="address" 
            onChange={() => setSelectAddress(item)} 
            value={item._id} 
            defaultChecked={(shippingAddress && shippingAddress._id === item._id) || item.isDefault}
            />
          <Form.Check.Label style={{ width: '100%'}} >
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
          id="new">
          <Form.Check.Input type='radio' name="address" onChange={() => setShowShippingForm(true)} />
          <Form.Check.Label style={{ width: '100%'}}>
            <Card sz="sm" style={{ width: '', fontSize: ".9em" }} >
              <Card.Body className='p-2'>
                <Card.Text className='mb-4'><strong>Ship to New Address</strong></Card.Text>
              </Card.Body>
            </Card>
          </Form.Check.Label>
        </Form.Check>
        {!isAddressValid && !isCartLoading && <Button type="submit" variant="primary"  className="my-5" size="lg">Continue To Payment</Button>}
        {isCartLoading && <Loader/>}
      </Form>}
      {showShippingForm && <ShippingAddressForm setVerifiedAddress={setVerifiedAddress} setIsAddressValid={setIsAddressValid} setShowShippingForm={setShowShippingForm}/>}
      {isAddressValid && <>
        <Message variant="success">Address verified! <CheckCircleOutlineIcon/></Message>
        <FormGroup controlId='name' className="my-4">
          <span className='me-5'>Set this as your default address?</span>
          <FormCheck inline type="checkbox" value={isDefault} onChange={() => setIsDefault(prevState => !prevState)} id={`inline-checkbox-1`} checked={isDefault}/>
        </FormGroup>
        <Button variant="primary"  className="my-5" size="lg" onClick={handleContinueButton}>Continue To Payment</Button>
      </>}
    </FormContainer>
  )
}

export default ShippingPage