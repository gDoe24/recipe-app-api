import React, { Fragment } from "react";
import MyRecipes from "./MyRecipes";
import Header from "../layout/Header";

export default function Dashboard() {
  return (
    <Fragment>
    <Header />
    <div className="container">
      <MyRecipes/>
      </div>
    </Fragment>
  );
}