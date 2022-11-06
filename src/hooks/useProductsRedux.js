import { useSelector, useDispatch } from 'react-redux';
import { productsActions, fetchProducts } from "../reducers/productsSlice";

export default function useProductsRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.productList)) {
    return {
        productsList: useSelector(state => state.productList),
        productsActions,
        fetchProducts: () => dispatch(fetchProducts())
    };
  } else {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }


}
