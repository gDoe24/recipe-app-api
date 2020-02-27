import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe, getIngredients } from "../../actions/recipes.js";
import IngredientForm from './IngredientForm';


const list=[1,2,3];

export class Form extends Component {

  
constructor(){
  super();

  this.state={
    title: 'Kobe',
    time: '2',
    price: '4',
    servings: '8',
    ingredients: {
      id: 6,
      name:'DWade',
    },
  };

  this.changeState = this.changeState.bind(this);
}
	
	static propTypes = {
		addRecipe: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
	}

  

	onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

	onSubmit = e => {
		e.preventDefault();
		const { title, time, price, servings, ingredients } = this.state;
		const recipe = { title, time, price, servings, ingredients };
		this.props.addRecipe(recipe);
	}

  changeState = (value) =>{
    this.setState({
      ingredients: {
      name: this.state.ingredients.name.concat(' '+value),
      }
    }),
    console.log(this.state.ingredients.name)
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
          <label>Ingredients</label>
            <pre
            name="ingredients">
            {ingredients.name}
            </pre>
            </div>
          <div className="form-group">
            <IngredientForm action={this.changeState} ingredients={ingredients}/>
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