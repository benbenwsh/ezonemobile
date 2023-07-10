import React from "react";
import LoginError from "../components/LoginError";
import LoginSuccess from "../components/LoginSuccess";
import CountrySelector from "../components/CountrySelector";

export function Home() {
  return (
    <>
      <h1>Home page</h1>
      <LoginError />
      <LoginSuccess />
    </>
  );
}
