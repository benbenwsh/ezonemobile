import {useRef, React} from "react";
import FormInput from "./FormInput";
import Button from "./Button";

export default function RegisterForm() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const descriptionStyle = {
    fontFamily: "'Varela Round', sans-serif",
  };

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
        console.error('Register failed');
      }
    } catch (error) {
      console.error('Error occurred during register', error);
    }
  })

  return (
    <>
      <div className="container text-center form-max-width">
        <h1 className="mt-5 mb-4 display-3 fw-bold">
          The best offer <br />
          <span className="text-warning">for your business</span>
        </h1>
        <h5 className="text-body-secondary mb-5" style={descriptionStyle}>
          Sign up to see more product information
        </h5>
        <div className="mx-4 mx-md-0">
          <form>
            <div className="row gy-3">
              <div className="col-12 col-sm-6">
                <FormInput type="text" placeholder="First name" name="fName" inputRef={firstNameRef}/>
              </div>
              <div className="col-12 col-sm-6 mb-3">
                <FormInput type="text" placeholder="Last name" name="lName" inputRef={lastNameRef}/>
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput type="email" placeholder="Email" name="email" />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="email"
                  placeholder="Verify Email"
                  name="verifyEmail"
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
            </div>
            <div className="row gy-3">
              <div className="col-6 col-md-4">
                <FormInput type="text" placeholder="Country" name="country" />
              </div>
              <div className="col-6 col-md-4">
                <FormInput type="text" placeholder="City" name="city" />
              </div>
              <div className="col-12 col-sm-12 col-md-4 mb-3">
                <FormInput type="text" placeholder="State" name="state" />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput type="text" placeholder="Address" name="address" />
              </div>
            </div>
            <div className="text-end">
              <Button className="btn-outline-warning me-2" btnName="Reset" />
              <Button className="btn-success" btnName="Sign up" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}