import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {selectUserChecked} from '../../features/Auth/authSlice';

function Protected({children}) {
  const user = useSelector(selectUserChecked);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;