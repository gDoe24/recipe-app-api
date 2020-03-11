import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes, deleteRecipe } from "../../actions/recipes.js";


export class Recipes extends Component {
	static propTypes = {
		recipes: PropTypes.array.isRequired,
		deleteRecipe: PropTypes.func.isRequired
	}

	componentDidMount(){
		this.props.getRecipes();
	}
	render() {
		return (
			<Fragment>
				<h2>Recipes</h2>
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
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	recipes: state.recipes.recipes
});
export default connect(mapStateToProps, { getRecipes, deleteRecipe })(Recipes);