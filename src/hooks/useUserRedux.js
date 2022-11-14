import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../reducers/userSlice";
import { login, logout, authorizeToken, register, updateProfile } from '../reducers/userReducers';
export default function useUserRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.user)) {
    return {
        user: useSelector(state => state.user),
        login: data => dispatch(login(data)),
        register: data => dispatch(register(data)),
        updateProfile: data => dispatch(updateProfile(data)),
        logout: () => dispatch(logout()),
        authorizeToken: () => dispatch(authorizeToken()),
    };
  } else {
    throw Error('Error accessing user reducer.');
  }
}
