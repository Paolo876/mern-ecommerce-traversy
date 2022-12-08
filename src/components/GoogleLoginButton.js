import React from 'react'
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
const GoogleLoginButton = () => {
  return (
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    console.log(jwt_decode(credentialResponse.credential));
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  // auto_select
  
/>
  )
}

export default GoogleLoginButton