import React, { useState } from "react";
import useUserDataFetch from "../../hooks/useUserDataFetch";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../store/slice/userSlice";
import ConfirmModal from "../../shared/ConfirmModal";
import InputWithLabel from "../../shared/InputWithLabel";

const EditProfile = ({ setFunction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  useUserDataFetch(setFunction);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  if (!user) return null;
  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/editUserData`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email }),
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
    setEdit(false);
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
            typeText="text"
            edit={edit}
            inputValue={fullName}
            legendText="Full Name"
            setInput={setFullName}
          />

          <InputWithLabel
            typeText="text"
            edit={edit}
            inputValue={email}
            legendText="Email"
            setInput={setEmail}
          />

          <div className="card-body items-center text-center">
            <div className="card-actions">
              <button
                disabled={!edit}
                onClick={() => setIsModalOpen(true)}
                className={`px-4 py-2 rounded bg-blue-600 text-white 
                ${!edit ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}
              `}
              >
                Update
              </button>

              <button
                className="btn btn-warning"
                onClick={() => setEdit(!edit)}
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

export default EditProfile;
