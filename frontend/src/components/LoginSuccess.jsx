import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginSuccess() {
  const notify = () =>
    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div>
      <button onClick={notify}>Login success</button>
      <ToastContainer />
    </div>
  );
}
