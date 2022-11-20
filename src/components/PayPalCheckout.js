import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js"
import axios from 'axios'
import Loader from './Loader';
import Message from './Message';

const PayPalCheckout = ({ orderTotal }) => {
  const [ payPalClientId, setPayPalClientId ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState()
  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:3001/api/config/paypal`)
        .then(res => {
            setPayPalClientId(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
  }, []) 
  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>

  const createOrder = async (data, actions) => {
    return actions.order.create({
        purchase_units: [{
            amount: {
                value: orderTotal.toFixed(2)
            }
        }]
        })
  }
  const onApprove = async (data, actions) => {
    return actions.order.capture().then( function (details) {
        console.log("order paid by", details.payer.name.giver_name);
    })
  }
  return (
    <>
    {!isLoading && payPalClientId && 
        <PayPalScriptProvider options={{"client-id": payPalClientId}}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>}
    </>
  )
}

export default PayPalCheckout