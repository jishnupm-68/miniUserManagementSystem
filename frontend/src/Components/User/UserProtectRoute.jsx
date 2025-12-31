
import { useEffect, useState } from 'react';
import { Navigate, Outlet  } from 'react-router';
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slice/userSlice";
const UserProtectRoute = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const [status, setStatus] = useState()
  
    const fetchUser = async () => {
      const data = await fetch(apiUrl + "/user/getData", {
        method: "GET",
        credentials: "include",
      });
      const dataJson = await data.json();
      dispatch(addUser(dataJson.data));
      setStatus(dataJson)
    };
    useEffect(() => {
      const fetchData = async () => {
        await fetchUser();
      };
      fetchData();
    }, []);
    if(!status) return 
    return (!status.status)  ? <Navigate to="/user/login" replace /> : <Outlet />
}

export default UserProtectRoute
