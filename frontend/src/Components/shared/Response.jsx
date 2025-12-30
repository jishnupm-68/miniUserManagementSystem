import React, { useEffect } from "react";

const Response = ({ status, message, clearResponse }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearResponse("");
    }, 3000);
    return () => timer;
  }, [message]);
  return (
    <div>
      {message && (
        <div
          role="alert"
          className={
            " mt-2 p-2 alert alert-outline " +
            (status ? " alert-success" : " alert-error")
          }
        >
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Response;
