
import { useDispatch } from 'react-redux';
import { Navigate, Outlet  } from 'react-router';
import { addData } from '../../store/slice/dataSlice';
import { addUser } from '../../store/slice/userSlice';
import { useEffect, useState } from 'react';

const ProtectRoute = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const data = await fetch(apiUrl + "/admin/getData", {
      method: "GET",
      credentials: "include",
    });
    const dataJson = await data.json();
    dispatch(addData(dataJson));
    dispatch(addUser(dataJson.user));
    setStatus(dataJson);
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };
    fetchData();
  }, []);
  if (!status) return;
  return !status.status ? <Navigate to="/admin/login" replace /> : <Outlet />;
}

export default ProtectRoute
