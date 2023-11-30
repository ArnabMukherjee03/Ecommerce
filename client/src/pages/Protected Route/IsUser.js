import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {selectUserChecked} from '../../features/Auth/authSlice';
import toast from 'react-hot-toast';

function IsUser({children}) {
  const user = useSelector(selectUserChecked);

  if (user) {
    toast.error("Already Logged In");
    return <Navigate to="/"></Navigate>;
  }
  return children;
}

export default IsUser;