import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../store/slice/dataSlice";
import { addUser } from "../../store/slice/userSlice";


const useAdminDataFetch = (setFunction) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const dispatch = useDispatch()
    try {
        const fetchUser = async()=>{
        const data = await fetch(apiUrl+"/admin/getData",
            {
                method:"GET",
                credentials:"include"
            }
        )
        const dataJson = await data.json()
        dispatch(addData(dataJson));
        dispatch(addUser(dataJson.user));
        setFunction(dataJson.status, dataJson.message)
    } 
    useEffect(()=>{
        const fetchData = async()=>{
             await fetchUser()
        }
        fetchData() 
    },[]);
}catch (error) {
    setFunction(error.status, error.message)
        console.log(error)
    }
    
}

export default useAdminDataFetch
