import {useEffect, useCallback, React} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginSuccess(props) {
  const notify = useCallback(() =>
    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }), []);

  useEffect(() => {
    if (props.loginSuccess) {
      props.setLoginSuccess(false);
      notify();
    }
  }, [props, notify])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
