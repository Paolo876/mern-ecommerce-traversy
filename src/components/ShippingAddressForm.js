import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap'
import useUspsAddressVerification from '../hooks/useUspsAddressVerification';
import useUserRedux from '../hooks/useUserRedux';
import useCartRedux from '../hooks/useCartRedux';
import Message from './Message';
import Loader from './Loader';
import usStatesArray from '../utils/usStatesArray';
import usZipValidation from '../utils/usZipValidation';

const ShippingAddressForm = ({ setVerifiedAddress, setIsAddressValid }) => {
    const { saveShippingAddress, cart: { shippingAddress, savedAddresses, isLoading: isCartLoading, error: cartError }, fetchUserAddresses } = useCartRedux();
    const { isAddressValid, isLoading, error, verifyAddress, verifiedAddress } = useUspsAddressVerification();
    const { user: { userData } } = useUserRedux();

    //check for a shipping address on mount, autofill if true
    const [ name, setName ] = useState(shippingAddress && shippingAddress.name || userData && userData.name)
    const [ address2, setAddress2 ] = useState(shippingAddress && shippingAddress.address2 || '')
    const [ address1, setAddress1 ] = useState(shippingAddress && shippingAddress.address1 || '')
    const [ city, setCity ] = useState(shippingAddress && shippingAddress.city || '')
    const [ zip5, setZip5 ] = useState(shippingAddress && shippingAddress.zip5 || '')
    const [ state, setState ] = useState(shippingAddress && shippingAddress.state || "none")
    const [ formError, setFormError ] = useState(null)

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
    
    useEffect(() => {
        if(verifiedAddress) {
            setAddress2(verifiedAddress.address2)
            if(verifiedAddress.address1 !== "UNDEFINED") setAddress1(verifiedAddress.address1)
            setCity(verifiedAddress.city)
            setZip5(verifiedAddress.zip5)
            setState(verifiedAddress.state)
            setVerifiedAddress({name, ...verifiedAddress})
            setIsAddressValid(isAddressValid)
        }
    }, [verifiedAddress])
  return (
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
  )
}

export default ShippingAddressForm