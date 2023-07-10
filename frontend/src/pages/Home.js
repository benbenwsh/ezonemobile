import React from "react";
import LoginError from "../components/LoginError";
import LoginSuccess from "../components/LoginSuccess";

export function Home() {
  return (
    <>
      <h1>Home page</h1>
      <LoginError />
      <LoginSuccess />
    </>
  );
}
