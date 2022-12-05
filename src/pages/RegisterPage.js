import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"
import useDocumentTitle from '../hooks/useDocumentTitle'

const RegisterPage = () => {
  useDocumentTitle("MernShop | Sign Up")
  const { register, user: { isLoading, error, userData } } = useUserRedux();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ formError, setFormError ] = useState(null);
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  //redirect user if logged in.
  useEffect(() => {
    if(userData){
      if(!error) navigate(locationState && locationState.from ? locationState.from : "/")
    }
  }, [error, locationState, navigate, userData])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setFormError("Passwords do not match.")
    } else {
      register({name, email, password})
      setFormError(null)
    }
  }

  return (
    <FormContainer>
        <h1>Create an Account</h1>
        {locationState && locationState.error && <Message variant="warning">{locationState.error}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {formError && <Message variant ="danger">{formError}</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-4">
                <FormLabel>Name</FormLabel>
                <FormControl type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
            </FormGroup>
            <FormGroup controlId='email' className="my-4">
                <FormLabel>Email Address</FormLabel>
                <FormControl type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required/>
            </FormGroup>
            <FormGroup controlId='password' className="my-4">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required/>
            </FormGroup>
            <FormGroup controlId='confirmPassword' className="my-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
            </FormGroup>
            {isLoading && <Loader/>}
            {!isLoading && <Button type="submit" variant="primary"  className="my-4">Sign Up</Button>}
        </Form>
        <Row className='py-5'>
            <Col>
                Already a member? <Link to={"/login"} state={{from: locationState && locationState.from}}>Click here to log in.</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterPage

//location.state.from <-- for redirecting back to page before logging in