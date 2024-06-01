import  {  useState } from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminAuth = ({children}) => {

  const Navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('admin'))
  );

  if(currentUser!==null){
    return children;
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text : 'You are not logged in!'
    })
    return <Navigate to="/login" />
  }
  
  

}

export default AdminAuth;