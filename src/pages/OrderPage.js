import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useOrderRedux from '../hooks/useOrderRedux';

const OrderPage = () => {
  const location = useLocation();
  const { order: { createdOrder } } = useOrderRedux();
  useEffect(() => {

  }, [])
  console.log(createdOrder);
  return (
    <div>OrderPage</div>
  )
}

export default OrderPage