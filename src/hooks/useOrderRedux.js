import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from "../reducers/orderReducers";
import { orderActions } from '../reducers/orderSlice';
export default function useOrderRedux() {
  const dispatch = useDispatch();

  if(useSelector(state => state.order)) {
    return {
        order: useSelector(state => state.order),
        createOrder: data => dispatch(createOrder(data)),
    };
  } else {
    throw Error('Error accessing order reducer.');
  }


}
