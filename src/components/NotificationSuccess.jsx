import {useEffect, useCallback, React} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationSuccess(props) {
  const notify = useCallback(() =>
    toast.success(props.successMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }), [props.successMessage]);

  useEffect(() => {
    if (props.success) {
      props.setSuccess(false);
      notify();
    }
  }, [props, notify])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
