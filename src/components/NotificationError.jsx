import {useEffect, useCallback, React} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationError(props) {
  const notify = useCallback(() =>
    toast.error(props.errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }), [props.errorMessage]);

  useEffect(() => {
    if (props.error) {
      props.setError(false);
      notify();
    }
  }, [props, notify])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}