import {useRef, React} from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import CheckBox from "./CheckBox";

export default function SignInForm() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const RegisterButtonClicked = (async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      if (response.ok) {
        console.log('Register successful');
      } else {
        console.log('Register failed');
      }
    } catch (error) {
      console.error('Error occurred during register', error);
    }
  })

  return (
    <div className="col-lg-12 mb-5 mb-lg-0">
      <form>
        <div className="row">
          <div className="col-md-6 mb-4">
            <InputBox label="First Name" inputRef={firstNameRef}/>
          </div>
          <div className="col-md-6 mb-4">
            <InputBox label="Last Name" inputRef={lastNameRef}/>
          </div>
        </div>
        <div className="form-outline mb-4">
          <InputBox label="Email" inputRef={emailRef}/>
        </div>
        <div className="form-outline mb-4">
          <InputBox label="Password" inputRef={passwordRef}/>
        </div>
        <CheckBox
          msg="Subscribe to receive latest discount"
          chkName="subscribe"
        />
        <Button btnName="Register" handler={RegisterButtonClicked}/>
      </form>
    </div>
  );
}
