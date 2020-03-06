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
	
	addData = (e) => {
		/*console.log(e.target.value)*/
		this.props.list.push(e.target.value);
		var newList=this.props.list;
		this.setState({list: newList})
	}	
	
	render(){
		
		return(
			<Fragment>
				<label>Ingredients</label>
				<div className="my-custom-scrollbar">
				<table className ="table mb-0" style={{width: 150 + 'px', text_align: 'left'}}>
					<tbody>
						{ this.props.ingredients.map(ingredient =>(
							<tr>
							<td key= {ingredient.id}><button key="btn" className="btn ing-list" onClick={this.addData} value={ingredient.name}
							>{ingredient.name}</button></td>
						</tr>
						)
					)}
					</tbody>
				</table>
				</div>
			</Fragment>
		)
	}
}
		
const mapStateToProps = state => ({
	ingredients: state.recipes.ingredients
})
export default connect(mapStateToProps,{ getIngredients })(Ingredients);