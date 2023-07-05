import React from "react";
import RegisterForm from "../components/RegisterForm";

export function Register() {
  const contentStyle = {
    bgColor: {
      backgroundColor: "hsl(0, 0%, 96%)",
    },
  };
  return (
    <>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container text-center">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-warning">for your business</span>
              </h1>
            </div>
            <div className="col-lg-12 mb-5 mb-lg-0 d-flex justify-content-center">
              <div className="card w-50" style={contentStyle.bgColor}>
                <div className="card-body pt-5 pb-3 px-md-5 ">
                  <RegisterForm title="Sign In" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
