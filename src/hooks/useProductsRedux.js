import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../reducers/productsSlice";

export default function useProductsRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.productList)) {
    return {
        productsList: useSelector(state => state.productList),
        fetchProducts: () => dispatch(fetchProducts()),
    };
  } else {
    throw Error('Error accessing productList reducer.');
  }


}
