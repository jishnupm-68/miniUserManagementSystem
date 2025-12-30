import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slice/userSlice";

const useUserDataFetch = (setFunction) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  try {
    const fetchUser = async () => {
      const data = await fetch(apiUrl + "/user/getData", {
        method: "GET",
        credentials: "include",
      });
      const dataJson = await data.json();
      dispatch(addUser(dataJson.data));
      setFunction(dataJson.status, dataJson.message);
    };
    useEffect(() => {
      const fetchData = async () => {
        await fetchUser();
      };
      fetchData();
    }, []);
  } catch (error) {
    setFunction(error.status, error.message);
    console.log(error);
  }
};

export default useUserDataFetch;
