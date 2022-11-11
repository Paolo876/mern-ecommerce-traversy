import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"
const LoginPage = () => {
  const { login } = useUserRedux();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const location = useLocation();

  console.log(location);
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormControl type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
            </FormGroup>

            <Button type="submit" variant="primary">Sign In</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Not a member yet? <Link to={"/register"}>Click here to sign up.</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginPage