import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes, deleteRecipe } from "../../actions/recipes.js";
import Header from "../layout/Header"
import '../../../../core/static/css/frontend.css';

export class MyRecipes extends Component {

 static propTypes = {
    auth: PropTypes.object.isRequired,
    recipes: PropTypes.array.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
  };

  componentDidMount(){
    this.props.getRecipes();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authRecipes = (
      <div>
        <h2>{ user ? `${user.name}'s Recipes`: ''}</h2>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Servings</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { this.props.recipes.map(recipe =>(
              <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.title}</td>
              <td>{recipe.time}</td>
              <td>{recipe.servings}</td>
              <td>{recipe.price}</td>
              <td><button onClick={this.props.deleteRecipe.bind(this,recipe.id)} 
              className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
            )
          )}
        </tbody>
        </table>
        </div>
      );

    return (
      
      <Fragment>
      <Header />
      {user ? authRecipes: <Redirect to ="/login" />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.recipes.recipes
});

export default connect(mapStateToProps, {getRecipes, deleteRecipe })(MyRecipes);