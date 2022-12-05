import React, { useState } from 'react'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import axios from "axios"


const AdminUpdateProfileForm = ({ user }) => {
  const [ name, setName ] = useState(user.name);
  const [ isAdmin, setIsAdmin ] = useState(user.isAdmin);
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ success, setSuccess ] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios.put(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/admin/users/${user._id}/update`, { name, isAdmin }, { withCredentials: true})
      .then(res => {
        setName(res.data.name)
        setIsAdmin(res.data.isAdmin)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
    setSuccess(true)
  }

  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <Col md={4} className="mt-5">
        <h2>UPDATE USER'S PROFILE</h2>
        {success && <Message variant ="success" dismissible onClose={() => setSuccess(false)}>Successfully updated profile!</Message>}
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId='name' className="my-3">
                <FormLabel><strong>Enter new name:</strong></FormLabel>
                <FormControl type="text" placeholder={user.name} value={name} onChange={e => setName(e.target.value)} autoComplete="name"/>
            </FormGroup>
            <FormGroup controlId='name' className="my-3">
                <FormLabel className='me-5 mt-3'><strong>Set as admin: </strong></FormLabel>
                <FormCheck inline type="checkbox" value={isAdmin} onChange={() => setIsAdmin(prevState => !prevState)} id={`inline-checkbox-1`} checked={isAdmin}/>
                {isAdmin && <p><em><small style={{opacity: ".75"}}>(note: If checked, this user will have all admin privileges.)</small></em></p>}
            </FormGroup>
            <div className="d-grid my-5">
                {!isLoading && <Button type="submit" variant="primary" size='lg' disabled={user.name === name && user.isAdmin === isAdmin}>UPDATE PROFILE</Button>}
            </div>
        </Form>
    </Col>
  )
}

export default AdminUpdateProfileForm