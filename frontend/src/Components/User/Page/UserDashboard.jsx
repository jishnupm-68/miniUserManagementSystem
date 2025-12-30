import { useState } from "react";
import {  useSelector } from "react-redux";
import Response from "../../shared/Response";
import useUserDataFetch from "../../hooks/useUserDataFetch";
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

const UserDashBoard = () => {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();

  const setFunction = (status, message) => {
    setStatus(status);
    setMessage(message);
  };

  useUserDataFetch(setFunction);  
  const user = useSelector((store) => store.user);
  
  if (!user) return null; 




  return (
    <div className="bg-gray-700 px-5 py-5">
  <div className="w-full mb-4">
    <Response
      status={status}
      message={message}
      clearResponse={setMessage}
    />
  </div>

  {/* RESPONSIVE GRID */}
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    
    {/* LEFT CARD – Password */}
    
    <EditPassword  setFunction={setFunction} />
    {/* RIGHT CARD – Profile */}
    <EditProfile setFunction={setFunction}/>
    </div>

</div>

    
  );
};

export default UserDashBoard;
