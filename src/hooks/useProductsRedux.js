import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, createProduct,updateProduct } from "../reducers/productReducers";
import { productsActions } from '../reducers/productsSlice';
export default function useProductsRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.productList)) {
    return {
        productsList: useSelector(state => state.productList),
        fetchProducts: (keyword) => dispatch(fetchProducts(keyword)),
        createProduct: data => dispatch(createProduct(data)),
        updateProduct: data => dispatch(updateProduct(data)),
        deleteProduct: id => dispatch(deleteProduct(id)),
        clearSuccess: () => dispatch(productsActions.clearSuccess()),
        updateProductReview: data => dispatch(productsActions.updateProductReview(data)),
    };
  } else {
    throw Error('Error accessing productList reducer.');
  }


}
