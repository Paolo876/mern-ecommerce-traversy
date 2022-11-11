import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../reducers/userSlice";
import { login } from '../reducers/userReducers';
export default function useUserRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.user)) {
    return {
        user: useSelector(state => state.user),
        login: data => dispatch(login(data)),
        logout: () => dispatch(logout()),
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }
}
