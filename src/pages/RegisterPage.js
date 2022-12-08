import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, InputGroup } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"
import useDocumentTitle from '../hooks/useDocumentTitle'
import GoogleLoginButton from '../components/GoogleLoginButton'
import HrDivider from '../components/HrDivider'
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RegisterPage = () => {
  useDocumentTitle("MernShop | Sign Up")
  const { register, user: { isLoading, error, userData } } = useUserRedux();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ confirmEmail, setConfirmEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

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
        <div className="d-grid my-4 mt-5">
          <GoogleLoginButton 
            text="Sign up with Google"
            logoSrc="/assets/google-icon.svg"
            variant="outline-primary"
            size="lg"
            flow="auth-code"
            authUrl={`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/google-auth/login`}
          />
        </div>
        <HrDivider text="OR"/>
        <Form onSubmit={handleSubmit} className="my-5">
            <h5 className='mb-4'>Sign up with Information</h5>
            <InputGroup className="my-4">
              <InputGroup.Text className="px-2 text-primary"><BadgeIcon style={{margin: 0}}/></InputGroup.Text>
              <Form.Control  type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required aria-label="name"/>
            </InputGroup>
            <InputGroup className="my-4">
              <InputGroup.Text className="px-2 text-primary"><EmailIcon style={{margin: 0}}/></InputGroup.Text>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" aria-label="email"/>
            </InputGroup>
            <InputGroup className="my-4">
              <InputGroup.Text className="px-2 text-primary" style={{cursor: "pointer"}} onClick={() => setShowPassword(prevState => !prevState)}>
                {showPassword ? <VisibilityOffIcon style={{margin: 0}}/> : <VisibilityIcon style={{margin: 0}}/>}
              </InputGroup.Text>
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" aria-label="password"/>
            </InputGroup>
            <InputGroup className="my-4">
              <InputGroup.Text className="px-2 text-primary" style={{cursor: "pointer"}} onClick={() => setShowConfirmPassword(prevState => !prevState)}>
                {showConfirmPassword ? <VisibilityOffIcon style={{margin: 0}}/> : <VisibilityIcon style={{margin: 0}}/>}
              </InputGroup.Text>
              <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" aria-label="confirm-password"/>
            </InputGroup>

            {isLoading && <Loader/>}
            {!isLoading && <Button type="submit" variant="primary"  className="my-3 px-4" size="lg">Sign Up</Button>}
        </Form>
        <Row className='py-4'>
            <Col>
                Already a member? <Link to={"/login"} state={{from: locationState && locationState.from}}>Click here to log in.</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterPage

//location.state.from <-- for redirecting back to page before logging in