import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"
import useDocumentTitle from '../hooks/useDocumentTitle'
const LoginPage = () => {
  useDocumentTitle("MernShop | Login")
  const { login, user: {isLoading, error, userData} } = useUserRedux();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  //redirect user if logged in.
  useEffect(() => {
    if(userData){
      if(!error) navigate(locationState && locationState.from ? locationState.from : "/")
    }
  }, [error, locationState, navigate, userData])

  const handleSubmit = e => {
    e.preventDefault();
    login({email, password})
  }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {locationState && locationState.error && <Message variant="warning">{locationState.error}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup  className="my-3">
                <FormLabel>Email Address</FormLabel>
                <FormControl type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"/>
            </FormGroup>
            <FormGroup  className="my-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"/>
            </FormGroup>
            {isLoading && <Loader/>}
            {!isLoading && <Button type="submit" variant="primary"  className="my-4">Sign In</Button>}
        </Form>
        <Row className='py-5'>
            <Col>
                Not a member yet? <Link to={"/register"} state={{from: locationState && locationState.from}}>Click here to sign up.</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginPage

//location.state.from <-- for redirecting back to page before logging in