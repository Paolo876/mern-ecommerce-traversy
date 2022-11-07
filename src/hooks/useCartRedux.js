import { useSelector, useDispatch } from 'react-redux';
import { cartActions, fetchCartItems, addToCart } from "../reducers/cartSlice";

export default function useCartRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.cart)) {
    return {
        cart: useSelector(state => state.cart),
        addItem: () => dispatch(cartActions.addItem()),
        fetchCartItems: data => dispatch(fetchCartItems(data)),
        addToCart: item => dispatch(addToCart(item)),
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }


}
