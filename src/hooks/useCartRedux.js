import { useSelector, useDispatch } from 'react-redux';
import { cartActions, fetchCartItems } from "../reducers/cartSlice";

export default function useCartRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.cart)) {
    return {
        cart: useSelector(state => state.cart),
        addItem: () => dispatch(cartActions.addItem()),
        fetchCartItems: data => dispatch(fetchCartItems(data)),
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }


}
