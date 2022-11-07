import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../reducers/userSlice";

export default function useUserRedux() {
  const dispatch = useDispatch();
  if(useSelector(state => state.user)) {
    return {
        user: useSelector(state => state.user),
    };
  } else {
    throw Error('Error accessing cart reducer.');
  }
}
