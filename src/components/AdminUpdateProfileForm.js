import React, { useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import Loader from './Loader'
import Message from './Message'

const AdminUpdateProfileForm = ({ user }) => {
  const [ name, setName ] = useState(user.name);
  const [ isAdmin, setIsAdmin ] = useState(user.isAdmin);
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ success, setSuccess ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Col md={4} className="mt-5">
        <h2>UPDATE PROFILE</h2>
        {success && <Message variant ="success">Successfully updated profile!</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-3">
                <FormLabel>Enter new name: </FormLabel>
                <FormControl type="text" placeholder={user.name} value={name} onChange={e => setName(e.target.value)} autoComplete="name"/>
            </FormGroup>
            <div className="d-grid my-5">
                {!isLoading && <Button type="submit" variant="primary" size='lg'>UPDATE PROFILE</Button>}
            </div>
        </Form>
    </Col>
  )
}

export default AdminUpdateProfileForm