import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useUserRedux from '../hooks/useUserRedux'
import FormContainer from "../components/FormContainer"


const AccountSetupPage = () => {
  const { user: { isLoading, error, userData } } = useUserRedux();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  
  //redirect user if logged in.
  useEffect(() => {
    if(userData){
      if(!error) navigate(locationState && locationState.from ? locationState.from : "/")
    }
  }, [error, locationState, navigate, userData])
  return (
    <FormContainer>
        <h1>Finish Setting up your Account</h1>

    </FormContainer>
  )
}

export default AccountSetupPage