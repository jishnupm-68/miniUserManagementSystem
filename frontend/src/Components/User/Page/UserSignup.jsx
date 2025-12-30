import { useEffect, useState } from "react";
import { isEmail, isStrongPassword } from "validator";
import InputWithLabel from "../../shared/InputWithLabel";
import Response from "../../shared/Response";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/slice/userSlice";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminValidator, setAdminValidator] = useState("");
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const setFunction = (status, message) => {
    setResponseMessage(message);
    setResponseStatus(status);
    return;
  };
  const validateData = () => {
    if (!fullName) return setFunction(false, "Name is required");
    if (!email || !isEmail(email))
      return setFunction(false, "Please type a valid email address");
    if (!password || !confirmPassword)
      return setFunction(
        false,
        "Please type the password and confirm password"
      );
    if (password != confirmPassword)
      return setFunction(false, " password and confirm password must be same");
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
      if (validateData()) {
        const fetchSignup = await fetch(apiUrl + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            fullName: fullName,
            password: password,
            role: "user",
            adminValidator: adminValidator,
          }),
        });
        const fetchJson = await fetchSignup.json();
        if (fetchJson.status) {
          dispatch(addUser(fetchJson.data));
          setTimeout(() => {
            navigate("/user/login");
          }, 5000);
        }
        setFunction(fetchJson.status, fetchJson.message);
      }
    } catch (error) {
      setResponseMessage(error.message);
      setResponseStatus(error.status);
    }
  };
  useEffect(() => {
    if (password == confirmPassword) setPasswordMatch("");
    else setPasswordMatch("Password not match");
  }, [confirmPassword]);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up here
        </h2>
      </div>
      <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 ">
          <InputWithLabel
            legendText={"Full name"}
            typeText={"text"}
            setInput={setFullName}
            inputValue={fullName}
          />
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

          <InputWithLabel
            legendText={"Confirm Password"}
            typeText={"password"}
            setInput={setConfirmPassword}
            inputValue={confirmPassword}
          />
          {passwordMatch && <p className="text-red-600">{passwordMatch}</p>}
          <div>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign up
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
          Already a Member?{" "}
          <Link
            to={"/user/login"}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
