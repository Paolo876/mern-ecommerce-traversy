import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, addToCart, changeCartItemQuantity } from "../reducers/cartReducers";

export default function useCartRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.cart)) {
    return {
        cart: useSelector(state => state.cart),
        fetchCartItems: data => dispatch(fetchCartItems(data)),
        addToCart: item => dispatch(addToCart(item)),
        changeCartItemQuantity: item => dispatch(changeCartItemQuantity(item))
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }


}
