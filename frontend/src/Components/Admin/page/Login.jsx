import React, { useState } from "react";
import { isEmail, isStrongPassword } from "validator";
import { Link, useNavigate } from "react-router";
import InputWithLabel from "../../shared/InputWithLabel";
import Response from "../../shared/Response";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const setFunction = (status, message) => {
    setResponseMessage(message);
    setResponseStatus(status);
  };
  const validateData = () => {
    if (!isEmail(email)) return setFunction(false, "Invalid Email");
    if (!isStrongPassword(password))
      return setFunction(
        false,
        "Password must contain uppercase, lowercase, number, and special character"
      );
    return true;
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = validateData();
      if (result) {
        const fetchLogin = await fetch(apiUrl + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: email, password: password }),
        });
        const fetchLoginJson = await fetchLogin.json();
        dispatch(addUser(fetchLoginJson.data));
        setFunction(fetchLoginJson.status, fetchLoginJson.message);
      }
    } catch (error) {
      setFunction(error.status, error.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (responseStatus) {
        navigate("/admin/dashboard");
      }
    }, 3000);
    return () => timer;
  }, [responseStatus]);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <InputWithLabel
            legendText={"Email"}
            typeText={"email"}
            setInput={setEmail}
            inputValue={email}
          />

          <InputWithLabel
            legendText={"Password"}
            typeText={"password"}
            setInput={setPassword}
            inputValue={password}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={(e) => handleSubmit(e)}
            >
              Sign in
            </button>
            {responseMessage && (
              <Response
                status={responseStatus}
                message={responseMessage}
                clearResponse={setResponseMessage}
              />
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a Admin?{" "}
          <Link
            to={"/admin/signup"}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
