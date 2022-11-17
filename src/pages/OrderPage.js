import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';

const OrderPage = () => {
  const { state: locationState} = useLocation();
  const params = useParams();
  const [ order, setOrder ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:3001/api/orders/${params.id}`, {withCredentials: true})
    .then(res => {
      setOrder(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setIsLoading(false)
    })
  }, [])
  
  if(isLoading) return <Loader/>

  return (
    <div>

    </div>
  )
}

export default OrderPage