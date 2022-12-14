import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import axios from 'axios'
import Loader from './Loader';
import Message from './Message';


const PayPalCheckout = ({ setPaymentResult, disabled=false, shippingAddress }) => {
  const [ payPalClientId, setPayPalClientId ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState()

  /**
   * FUTURE CHANGES:
   *  fetch orderTotal from backend.
   */
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/config/paypal`)
        .then(res => {
            setPayPalClientId(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
  }, []) 

  const createOrder = async (data, actions) => {
    const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL || "http://localhost:3001"}/api/order-actions/cost-summary`, shippingAddress , { withCredentials: true})
    return actions.order.create({
        purchase_units: [{
            amount: {
                value: res.data.totalAmount.toFixed(2)
            }
        }],
        })
  }
  const onApprove = async (data, actions) => {
    actions.order.capture().then( function (details) {
        setPaymentResult({ id: details.id, status: details.status, email_address: details.payer.email_address, update_time: details.update_time })
    })
  }


  if(isLoading) return <Loader/>
  if(error) return <Message variant="danger">{error}</Message>
  return (
    <>
    {!isLoading && payPalClientId && 
        <PayPalScriptProvider options={{"client-id": payPalClientId}}>
            <PayPalButtons
                disabled={disabled}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={err => setError(err.message)}
            />
        </PayPalScriptProvider>}
    </>
  )
}

export default PayPalCheckout