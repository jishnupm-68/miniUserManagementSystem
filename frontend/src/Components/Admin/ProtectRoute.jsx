
import { Navigate, Outlet  } from 'react-router';

const ProtectRoute = () => {
     const token= document.cookie
    return (!token)  ? <Navigate to="/admin/login" replace /> : <Outlet />
}

export default ProtectRoute
