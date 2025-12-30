import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../../store/slice/userSlice";
import Response from "../shared/Response";

const UserHeader = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((store) => store.user);
  const [status, setStatus] = useState();
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setFunction = (status, message) => {
    setStatus(status);
    setResponse(message);
  };
  const handleLogin = () => {
    navigate("/user/login");
  };
  const handleLogout = async () => {
    try {
      if (user) {
        const logoutFetch = await fetch(apiUrl + "/logout", {
          method: "POST",
          credentials: "include",
        });
        const logoutJson = await logoutFetch.json();
        if (logoutJson.status) {
          dispatch(clearUser());
          setTimeout(() => {
            navigate("/user/login");
          }, 3000);
        }
        setFunction(logoutJson.status, logoutJson.message);
      }
    } catch (error) {
      setFunction(error.status, error.message);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {user && (
            <a className="btn btn-ghost text-xl">{`${user.role} : ${user.fullName}`}</a>
          )}
        </div>

        <div className="navbar-end">
          {user ? (
            <button className="btn" onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <button className="btn" onClick={() => handleLogin()}>
              Login
            </button>
          )}
        </div>
      </div>
      <div>
        {response && (
          <Response
            status={status}
            message={response}
            clearResponse={setResponse}
          />
        )}
      </div>
    </div>
  );
};

export default UserHeader;
