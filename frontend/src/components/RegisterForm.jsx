import { useRef, React } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";

export default function RegisterForm() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const addressRef = useRef(null);

  const descriptionStyle = {
    fontFamily: "'Varela Round', sans-serif",
  };

  const SignUpButtonClicked = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const country = countryRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const address = addressRef.current.value;

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          city,
          state,
          address,
        }),
      });

      if (response.ok) {
        console.log("Sign up successful");
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  };

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
          <form action="#" method="POST">
            <div className="row gy-3">
              <div className="col-12 col-sm-6">
                <FormInput
                  type="text"
                  placeholder="First name"
                  name="fName"
                  inputRef={firstNameRef}
                />
              </div>
              <div className="col-12 col-sm-6 mb-3">
                <FormInput
                  type="text"
                  placeholder="Last name"
                  name="lName"
                  inputRef={lastNameRef}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  inputRef={emailRef}
                />
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
                  inputRef={passwordRef}
                />
              </div>
            </div>
            <div className="row gy-3">
              <div className="col-6 col-md-4">
                <FormInput
                  type="text"
                  placeholder="Country"
                  name="country"
                  inputRef={countryRef}
                />
              </div>
              <div className="col-6 col-md-4">
                <FormInput
                  type="text"
                  placeholder="City"
                  name="city"
                  inputRef={cityRef}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-4 mb-3">
                <FormInput
                  type="text"
                  placeholder="State"
                  name="state"
                  inputRef={stateRef}
                />
              </div>
            </div>
            <div className="row gy-3 mb-3">
              <div className="col-12">
                <FormInput
                  type="text"
                  placeholder="Address"
                  name="address"
                  inputRef={addressRef}
                />
              </div>
            </div>
            <div className="form-check d-flex justify-content-center mb-4">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="term"
              />
              <label
                className="form-check-label text-body-tertiary term-label"
                for="term"
              >
                By logging in, you agree to the{" "}
                <Link className="text-dark">Terms of Service</Link> and{" "}
                <Link className="text-dark">Privacy Policy</Link>
              </label>
            </div>
            <div className="text-end">
              <Button className="btn-outline-warning me-2" btnName="Reset" />
              <Button
                className="btn-success"
                btnName="Sign up"
                handler={SignUpButtonClicked}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
