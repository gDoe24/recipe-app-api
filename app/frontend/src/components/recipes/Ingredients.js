import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIngredients } from "../../actions/recipes.js";

export class Ingredients extends Component{

	static propType = {
		ingredients: PropTypes.array.isRequired,
	}

	componentDidMount(){
		ingredients: this.props.getIngredients();
	}
	render(){
		return(
			<Fragment>
				<h2>Ingredients</h2>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Amount</th>
							<th>Unit</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.ingredients.map(ingredient =>(
							<tr key={ingredient.id}>
							<td>{ingredient.id}</td>
							<td>{ingredient.name}</td>
							<td>{ingredient.amount}</td>
							<td>{ingredient.unit}</td>
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
	ingredients: state.recipes.ingredients
})
export default connect(mapStateToProps,{ getIngredients })(Ingredients);