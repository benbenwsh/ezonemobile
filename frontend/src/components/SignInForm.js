import {useState, useRef, React} from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import CheckBox from "./CheckBox";

export default function SignInForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const LoginButtonClicked = (async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Login successful');

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);

      }
    } catch (error) {
      console.error('Error occurred during login: ', error);
    }
  })
  
  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <form>
        <div className="form-outline mb-4">
          <InputBox label="Email" inputRef={emailRef}/>
        </div>
        <div className="form-outline mb-4">
          <InputBox label="Password" inputRef={passwordRef}/>
        </div>
        <CheckBox msg="Remember login" chkName="subscribe" />
        <Button btnName="Login" handler={LoginButtonClicked}/>
      </form>
    </div>
  );
}
