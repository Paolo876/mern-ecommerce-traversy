import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, Col, FormCheck } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import useUserRedux from '../hooks/useUserRedux'
import useCartRedux from '../hooks/useCartRedux'
import CheckoutSteps from '../components/CheckoutSteps'
import useDocumentTitle from '../hooks/useDocumentTitle'

const PaymentPage = () => {
    useDocumentTitle("MernShop | Payment")
    const { user: { userData } } = useUserRedux();
    const { savePaymentMethod, cart: { shippingAddress } } = useCartRedux();
    const navigate = useNavigate();

    const [ paymentMethod, setPaymentMethod ] = useState("PayPal")
  
    // if not logged in, redirect to /login
    useEffect(() => {
      if(!userData) {
        navigate("/login")
      }
      if(!shippingAddress) {
        navigate("/shipping")
    }
    }, [userData, shippingAddress])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      savePaymentMethod(paymentMethod)
      navigate("/place-order")
    }
    
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>PAYMENT METHOD</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel as="legend" className='d-block'>Select Method:</FormLabel>
            <Col>
                <FormCheck type='radio' label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={e => setPaymentMethod(e.target.value)}/>
                {/* <FormCheck type='radio' label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" checked onChange={e => setPaymentMethod(e.target.value)}/> */}
            </Col>
          </FormGroup>

          <Button type="submit" variant="primary"  className="my-5">Continue</Button>
        </Form>
      </FormContainer>
    )
  
}

export default PaymentPage