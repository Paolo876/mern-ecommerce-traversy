import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from "../reducers/productsSlice";
import { productsActions } from '../reducers/productsSlice';
export default function useProductsRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.productList)) {
    return {
        productsList: useSelector(state => state.productList),
        fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        clearSuccess: () => dispatch(productsActions.clearSuccess()),
    };
  } else {
    throw Error('Error accessing productList reducer.');
  }


}
