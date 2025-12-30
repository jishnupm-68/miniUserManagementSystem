
import { Navigate, Outlet  } from 'react-router';

const UserProtectRoute = () => {
    const token= document.cookie
    return (!token)  ? <Navigate to="/user/login" replace /> : <Outlet />
}

export default UserProtectRoute
