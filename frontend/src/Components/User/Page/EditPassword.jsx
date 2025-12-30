import React, { useEffect, useState } from "react";
import ConfirmModal from "../../shared/ConfirmModal";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/slice/userSlice";
import InputWithLabel from "../../shared/InputWithLabel";
import { isStrongPassword } from "validator";

const EditPassword = ({ setFunction }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");

  useEffect(() => {
    if (password == confirmPassword) setPasswordMatch("");
    else setPasswordMatch("Password not match");
  }, [confirmPassword]);
  const handleConfirmUpdate = async () => {
    try {
      if (!password || !confirmPassword)
        return setFunction(
          false,
          "Please type the password and confirm password"
        );
      if (password != confirmPassword)
        return setFunction(
          false,
          " password and confirm password must be same"
        );
      if (!isStrongPassword(password))
        return setFunction(
          false,
          "Password must contain uppercase, lowercase, number, and special character"
        );
      const response = await fetch(`${apiUrl}/user/editPassword`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });

      const resultJson = await response.json();

      if (resultJson.status) {
        dispatch(addUser(resultJson.data));
        setFunction(resultJson.status, resultJson.message);
      } else {
        setFunction(resultJson.status, resultJson.message);
      }
    } catch (error) {
      setFunction(error.status, error.message || "Something went wrong");
    }

    setEditPassword(false);
    setIsModalOpen(false);
  };

  const handleCancelUpdate = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-md shadow-sm">
          <InputWithLabel
            typeText="password"
            edit={editPassword}
            inputValue={password}
            legendText="Password"
            setInput={setPassword}
          />

          <InputWithLabel
            typeText="password"
            edit={editPassword}
            inputValue={confirmPassword}
            legendText="Confirm Password"
            setInput={setConfirmPassword}
          />
          {passwordMatch && <p className="text-red-600 ">{passwordMatch}</p>}

          <div className="card-body items-center text-center">
            <div className="card-actions">
              <button
                disabled={!editPassword}
                onClick={() => setIsModalOpen(true)}
                className={`px-4 py-2 rounded bg-blue-600 text-white 
                ${
                  !editPassword
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }
              `}
              >
                Update
              </button>

              <button
                className="btn btn-warning"
                onClick={() => setEditPassword(!editPassword)}
              >
                Click to Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Update Profile"
        message="Are you sure you want to update your profile details?"
        confirmText="Yes, Update"
        cancelText="Cancel"
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
      />
    </div>
  );
};

export default EditPassword;
