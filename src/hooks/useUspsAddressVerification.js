import { useState } from 'react'

const useUspsAddressVerification = () => {
    const [ isAddressValid, setIsAddressValid ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null)

    const verifyAddress = async ({address1, address2, city, state, zip5}) => {
        setIsLoading(true)
        const res = await axios.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&xml=${uspsAddressValidationToUri({address1, address2, city, state, zip5})}`)
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
            setError(result.returnText)
            return
        }
        else {
            setIsAddressValid(true)
            setIsLoading(false)
            return result
        }
    }
    return {
        isAddressValid, isLoading, error, verifyAddress
    }
}

export default useUspsAddressVerification