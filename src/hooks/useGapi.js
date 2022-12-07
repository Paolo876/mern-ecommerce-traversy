import { useState, useEffect } from 'react'
import { loadAuth2, loadGapiInsideDOM } from 'gapi-script';

const useGapi = () => {
    const [ gapiInstance, setGapiInstance ] = useState(null);
    // const [ auth2, setAuth2 ] = useState(null)
    const [ googleProfile, setGoogleProfile ] = useState(null)

    const gapiInit = async () => {
        const gapi = await loadGapiInsideDOM();
        let auth2 = await loadAuth2(gapi, process.env.REACT_APP_OAUTH_CLIENT_ID, "" );
        // setGoogleProfile(res.currentUser.get().getBasicProfile())
        console.log("ASD,", auth2)
        // setAuth2(res)
        setGapiInstance(gapi)
      }


    // const signOut = async () => {
    //     auth2.signOut()
    // }
  return {
    gapiInit,
    googleProfile,
    // signOut
  }
}

export default useGapi