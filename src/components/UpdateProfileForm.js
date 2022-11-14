import React, { useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import Loader from './Loader'
import Message from './Message'

const UpdateProfileForm = () => {
  const { user: { userData, isLoading, error, success }, updateProfile } = useUserRedux();
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ formError, setFormError ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setFormError("Passwords do not match.")
    } else {
        const updatedData = {
            name: name.trim().length === 0 ? userData.name : name
        }
        if(password.trim().length !== 0) updatedData.password = password
        updateProfile(updatedData)
        setFormError(null)
    }
  }
  return (
    <Col md={4}>
        <h2>UPDATE PROFILE</h2>
        {error && <Message variant="danger">{error.message}</Message>}
        {formError && <Message variant ="danger">{formError}</Message>}
        {success && <Message variant ="success">Successfully updated profile!</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-3">
                <FormLabel>Enter new name: </FormLabel>
                <FormControl type="text" placeholder={userData.name} value={name} onChange={e => setName(e.target.value)} autoComplete="name"/>
            </FormGroup>
            <FormGroup controlId='password' className="my-3">
                <FormLabel>Enter new Password</FormLabel>
                <FormControl type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"/>
            </FormGroup>
            <FormGroup controlId='confirmPassword' className="my-3">
                <FormLabel>Confirm new Password</FormLabel>
                <FormControl type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </FormGroup>
            {isLoading && <Loader/>}
            <div className="d-grid my-5">
                {!isLoading && <Button type="submit" variant="primary" size='lg'>UPDATE PROFILE</Button>}
            </div>
        </Form>
    </Col>
  )
}

export default UpdateProfileForm