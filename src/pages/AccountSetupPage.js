import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Image, ListGroup, ListGroupItem, Form, InputGroup, Button } from 'react-bootstrap'
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"
import DocumentHead from '../components/DocumentHead'
import Loader from '../components/Loader'
import Message from '../components/Message'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import BadgeIcon from '@mui/icons-material/Badge';

const AccountSetupPage = () => {
  const { user: { isLoading, error, userData }, register } = useUserRedux();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const { email, picture, name: _name, googleId } = locationState.userData
  //form states
  const [ name, setName ] = useState(_name);
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

  const [ pictureError, setPictureError ] = useState(false);
  const [ formError, setFormError ] = useState()
  //redirect user if logged in.
  useEffect(() => {
    if(userData || !(locationState && locationState.userData)){
      if(!error) navigate(locationState && locationState.from ? locationState.from : "/")
    }
  }, [error, locationState, navigate, userData])

  const handleSubmit = (e) => {
    if(name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0 || picture.length === 0) {
      setFormError("Input must not be left blank.")
    } else if(password !== confirmPassword) {
      setFormError("Passwords do not match.")
    } else {
      register({name, email, password, picture, googleId})
    }
    e.preventDefault();
  }
  return (
    <FormContainer>
      <DocumentHead title="MernShop | Account Setup" description="Finish Setting up your Account to start purchasing the best and newest gadgets and electronics."/>
      {error && <Message variant="danger">{error}</Message>}
      <h1>Welcome, {_name}! Let's set up your account</h1>
      {!pictureError && <Image 
        className='rounded mx-auto d-block'
        src={picture} 
        style={{maxHeight: "100px", width: "auto"}} 
        onError={() => setPictureError(true)} 
        roundedCircle 
        fluid
        thumbnail/>}

      <Form onSubmit={handleSubmit} className="mt-4">
        {formError && <Message variant="danger">{formError}</Message>}
        <InputGroup className="my-4">
          <InputGroup.Text className="px-2 text-primary"><GoogleIcon style={{margin: 0}}/></InputGroup.Text>
          <Form.Control type="email" disabled value={locationState.userData.email}  autoComplete="email" aria-label="email"/>
        </InputGroup>
        <InputGroup className="my-4">
          <InputGroup.Text className="px-2 text-primary"><BadgeIcon style={{margin: 0}}/></InputGroup.Text>
          <Form.Control  type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required aria-label="name"/>
        </InputGroup>
        <InputGroup className="my-4">
          <InputGroup.Text className="px-2 text-info" style={{cursor: "pointer"}} onClick={() => setShowPassword(prevState => !prevState)}>
            {showPassword ? <VisibilityOffIcon style={{margin: 0}}/> : <VisibilityIcon style={{margin: 0}}/>}
          </InputGroup.Text>
          <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" aria-label="password"/>
        </InputGroup>
        <InputGroup className="my-4">
          <InputGroup.Text className="px-2 text-info" style={{cursor: "pointer"}} onClick={() => setShowConfirmPassword(prevState => !prevState)}>
            {showConfirmPassword ? <VisibilityOffIcon style={{margin: 0}}/> : <VisibilityIcon style={{margin: 0}}/>}
          </InputGroup.Text>
          <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" aria-label="confirm-password"/>
        </InputGroup>

        {isLoading && <Loader/>}
        {!isLoading && <Button type="submit" variant="primary"  className="my-3 px-4" size="lg">Continue</Button>}
      </Form>
    </FormContainer>
  )
}

export default AccountSetupPage