import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe, getIngredients } from "../../actions/recipes.js";
import Ingredients from './Ingredients';


const list=[1,2,3];

export class Form extends Component {

  
constructor(){
  super();

  this.state={
    title: 'Kobe',
    time: '2',
    price: '4',
    servings: '8',
    ingredients: ['Cashapp','Jellybean'],
  };
}
	
	static propTypes = {
		addRecipe: PropTypes.func.isRequired,
	}

  

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const { title, time, price, servings, ingredients } = this.state;
		const recipe = { title, time, price, servings, ingredients };
		this.props.addRecipe(recipe);
	}

	 render() {
    const { title, time, price, servings, ingredients } = this.state;
      
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Recipe</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="title"
              name="title"
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              className="form-control"
              type="number"
              name="time"
              onChange={this.onChange}
              value={time}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              onChange={this.onChange}
              value={price}
            />
          </div>
          <div className="form-group">
            <label>Servings</label>
            <input
              className="form-control"
              type="number"
              name="servings"
              onChange={this.onChange}
              value={servings}
            />
          </div>
          <div className="form-group">
            <Ingredients list={ingredients}/>
            <div
              id="display-ingredients"
              name="ingredients"
            >
            <pre>{this.props.list}</pre></div>
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
export default connect(null, { addRecipe })(Form)