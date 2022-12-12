import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, addToCart, changeCartItemQuantity, removeFromCart, fetchUserAddresses } from "../reducers/cartReducers";
import { cartActions } from '../reducers/cartSlice';
export default function useCartRedux() {
  const dispatch = useDispatch();

  if(useSelector(state => state.cart)) {
    return {
        cart: useSelector(state => state.cart),
        saveShippingAddress: data => dispatch(cartActions.saveShippingAddress(data)),
        savePaymentMethod: data => dispatch(cartActions.savePaymentMethod(data)),
        fetchCartItems: data => dispatch(fetchCartItems(data)),
        fetchUserAddresses: () => dispatch(fetchUserAddresses()),
        addToCart: item => dispatch(addToCart(item)),
        changeCartItemQuantity: item => dispatch(changeCartItemQuantity(item)),
        removeFromCart: item => dispatch(removeFromCart(item)),
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }


}
