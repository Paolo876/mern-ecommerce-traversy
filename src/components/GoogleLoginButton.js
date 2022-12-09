import { useGoogleLogin } from "@react-oauth/google"
import { Button } from 'react-bootstrap'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

const GoogleLoginButton = ({ text, logoSrc, variant, size, flow, authUrl}) => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const handleClick = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { data } = await axios.post(authUrl, { code: credentialResponse.code })
      if(data && data.noUser) {
        navigate("/account-setup", {state: {...locationState, userData: data.userData}})
      }
    },
    flow: {flow},
    
  });

  return (
    <Button 
      onClick={handleClick} 
      type="button"
      variant={variant}
      size={size}>
        <img src={logoSrc} style={{maxHeight: "20px"}}/> {text}
    </Button>
  )

}

export default GoogleLoginButton