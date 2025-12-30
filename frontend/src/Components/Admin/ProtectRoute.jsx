
import { useSelector } from 'react-redux'
import { Navigate, Outlet  } from 'react-router';

const ProtectRoute = () => {
    const user = useSelector(store=>store.user);
    return (!user)  ? <Navigate to="/admin/login" replace /> : <Outlet />
}

export default ProtectRoute
