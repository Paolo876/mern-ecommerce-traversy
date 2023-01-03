import { useState } from 'react'
import uspsAddressValidationToUri from '../utils/uspsAddressValidationToUri';
import XMLParser from 'react-xml-parser';
import axios from 'axios';
const useUspsAddressVerification = () => {
    const [ isAddressValid, setIsAddressValid ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null)
    const [ verifiedAddress, setVerifiedAddress ] = useState(null);
    const verifyAddress = async ({address1, address2, city, state, zip5}) => {
        setIsLoading(true)
        const res = await axios.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&xml=${uspsAddressValidationToUri({address1, address2, city, state, zip5})}`)
        console.log(res.data)
        var data = new XMLParser().parseFromString(res.data).getElementsByTagName('Address')[0].children;    
        let result = {}
        data.forEach(item => result[item.name.charAt(0).toLowerCase() + item.name.slice(1)] = item.value)
        if(result.hasOwnProperty('error')){
            setIsLoading(false)
            setError("The address you entered was not found. Please make sure input is a valid United States address.")
            return
        }
        else if(result.returnText){
            setIsLoading(false)
            setVerifiedAddress(result)
            setError(result.returnText)
            return
        }
        else {
            setIsAddressValid(true)
            setIsLoading(false)
            setVerifiedAddress(result)
            return
        }
    }
    return {
        isAddressValid, isLoading, error, verifyAddress, verifiedAddress
    }
}

export default useUspsAddressVerification