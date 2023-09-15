import {useEffect, useCallback, React} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification(props) {
  const notifySuccess = useCallback(() => {
    toast.success(props.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, [props.message]);

  const notifyError = useCallback(() => {
    toast.error(props.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, [props.message]);

  useEffect(() => {
    if (props.success) {
      props.setSuccess(false);
      notifySuccess();
    }
    
    if (props.error) {
      props.setError(false);
      notifyError();
    }
  }, [props, notifySuccess, notifyError])

  return (
    <ToastContainer />
  );
}
