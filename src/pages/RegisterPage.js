import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
  const [ confirmEmail, setConfirmEmail ] = useState('');
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
    } 
    else if(email !== confirmEmail) {
      setFormError("Emails do not match.")
    }else {
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
            <FormGroup controlId='name' className="my-3">
                <FormLabel><strong>Name</strong></FormLabel>
                <FormControl type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
            </FormGroup>
            <FormGroup controlId='email' className="my-3">
                <FormLabel><strong>Email Address</strong></FormLabel>
                <FormControl type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="new-email" required/>
            </FormGroup>
            <FormGroup controlId='confirmEmail' className="my-3">
                <FormLabel><strong>Confirm Email Address</strong></FormLabel>
                <FormControl type="email" placeholder="Confirm email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} autoComplete="confirm-email" required/>
            </FormGroup>
            <FormGroup controlId='password' className="my-3">
                <FormLabel><strong>Password</strong></FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" required/>
            </FormGroup>
            <FormGroup controlId='confirmPassword' className="my-3">
                <FormLabel><strong>Confirm Password</strong></FormLabel>
                <FormControl type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="confirm-password"  required/>
            </FormGroup>
            {isLoading && <Loader/>}
            {!isLoading && <Button type="submit" variant="primary"  className="my-3">Sign Up</Button>}
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