import React, { useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import Loader from './Loader'
import Message from './Message'

const UpdateProfileForm = () => {
  const { user: { userData, isLoading, error } } = useUserRedux();
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ formError, setFormError ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <Col md={2}>
        <h2>UPDATE PROFILE</h2>
        {error && <Message variant="danger">{error.message}</Message>}
        {formError && <Message variant ="danger">{formError}</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-2">
                <FormLabel>Name</FormLabel>
                <FormControl type="text" placeholder={userData.name} value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>
            </FormGroup>
            <FormGroup controlId='password' className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required/>
            </FormGroup>
            <FormGroup controlId='confirmPassword' className="my-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
            </FormGroup>
            {isLoading && <Loader/>}
            {!isLoading && <Button type="submit" variant="primary"  className="my-2">Sign In</Button>}
        </Form>
    </Col>
  )
}

export default UpdateProfileForm