import React, { useEffect } from 'react';
import useCartRedux from '../hooks/useCartRedux';

const CartPage = () => {
  const { cart } = useCartRedux();
  console.log(cart)
  return (
    <div>CartPage</div>
  )
}

export default CartPage