import React, { Fragment } from "react";
import Form from "./Form";
import Header from "../layout/Header";

export default function Dashboard() {
  return (
    <Fragment>
    <Header />
    <div className="container">
      <Form />
      </div>
    </Fragment>
  );
}