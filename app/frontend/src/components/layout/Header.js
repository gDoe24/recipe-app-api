import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, loadUser } from "../../actions/auth";
import Head from "./Head";
import '../../../../core/static/css/shop-homepage.css';

export class Header extends Component {

 static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
   
  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <span className="navbar-text ml-5 pr-3">
        <strong>{ user ? `Hi ${user.name}!`: ''}</strong>
      </span>
        <li className="nav-item">
          <button onClick={ this.props.logout } className="nav-link btn btn-info
          btn-sm text-light">Logout</button>
        </li>
      </ul>
      );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link " href="#" tabindex="-1" aria-disabled="true">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register"className="nav-link " href="#" tabindex="-1" aria-disabled="true">Register</Link>
        </li>
      </ul>
    );
    

    return (
      <Fragment>
        <Head />
      <header>
		<nav className="navbar navbar-expand-md fixed-top" >
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="nav-item" id="head"><a className="nav-link" href="../../">Word</a>
  </div>
  <div className="collapse navbar-collapse justify-content-md-center nav-items" id="navbar">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="../../all_recipes">Recipes<span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/my_recipes">myRecipes</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create_recipe">Create</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</a>
        <div className="dropdown-menu" aria-labelledby="dropdown08">
          <a className="dropdown-item" href={`../../all_recipes/tags/${3}`}>Breakfast</a>
          <a className="dropdown-item" href={`../../all_recipes/tags/${4}`}>Lunch</a>
          <a className="dropdown-item" href={`../../all_recipes/tags/${1}`}>Dinner</a>
          <a className="dropdown-item" href={`../../all_recipes/tags/${2}`}>Vegan</a>
        </div>
      </li>
      { isAuthenticated ? authLinks : guestLinks }
    </ul>
  </div>
</nav>
</header>
</Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout})(Header);