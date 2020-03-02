import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addIngredient, getIngredients } from "../../actions/recipes.js";



export class IngredientForm extends Component{
	constructor() {
    super()
      this.state={
  		name: 'Cheese',
  		unit: 'cup',
  		amount: 1,
  	}
}

	static propType = {
    
		addIngredients: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
	}

 
	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const {name, unit, amount} = this.state;
		const ingredient = {name, unit, amount};
    this.props.addIngredient(ingredient);
	}

  changeState = (e) => {
      this.props.action(e.target.value)
  }
  sortFunction = (a,b) =>{
    return b-a
  }

	 render() {
    const { name, unit, amount } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Ingredient</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="title"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input
              className="form-control"
              type="title"
              name="unit"
              onChange={this.onChange}
              value={unit}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              type="title"
              name="amount"
              onChange={this.onChange}
              value={amount}

            />
          <button onClick={ this.changeState}
           value={name}>Level Up</button>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
  

export default connect(null, { addIngredient })(IngredientForm)