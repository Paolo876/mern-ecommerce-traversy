import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const ShippingPage = () => {
  const [ address, setAddress ] = useState('')
  const [ city, setCity ] = useState('')
  const [ postalCode, setPostalCode ] = useState('')
  const [ country, setCountry ] = useState('')

  return (
    <FormContainer>ShippingPage</FormContainer>
  )
}

export default ShippingPage