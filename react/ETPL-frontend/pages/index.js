/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Home from './home'
import Admin from "layouts/Admin.js";
export default function Index() {
  return (
  <>
  <Home/>
  </>
  );
}
Index.layout = Admin;