import { useGoogleLogin } from "@react-oauth/google"
import { Button } from 'react-bootstrap'
import axios from "axios"
const GoogleLoginButton = ({ text, logoSrc, variant, size, flow, authUrl}) => {
  const handleClick = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const res = await axios.post(authUrl, { code: credentialResponse.code })

      console.log(res);
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