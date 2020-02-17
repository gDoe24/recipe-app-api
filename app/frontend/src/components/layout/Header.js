import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
		<nav className="navbar navbar-expand-md">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="nav-item" id="head"><a className="nav-link" href="{% url 'home' %}">Word</a>
  </div>
  <div className="collapse navbar-collapse justify-content-md-center" id="navbar">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link disabled" href="{% url 'all_recipes' %}">Recipes<span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">myRecipes</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="#" tabindex="-1" aria-disabled="true">Vegan</a>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link " href="#" tabindex="-1" aria-disabled="true">Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/register"className="nav-link " href="#" tabindex="-1" aria-disabled="true">Register</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Create New</a>
        <div className="dropdown-menu" aria-labelledby="dropdown08">
          <a className="dropdown-item" href="#">Recipe</a>
          <a className="dropdown-item" href="#">Category</a>
          <a className="dropdown-item" href="#">Ingredient</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
      )
  }
}

export default Header