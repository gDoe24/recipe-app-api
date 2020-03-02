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
    ingredients: [12],
    tags: [1],
    link: "",
    ingNames:"Dwade ",
    count:1,
  };

  this.changeState = this.changeState.bind(this);
}
	
	static propTypes = {
		addRecipe: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
	}

  
   componentDidMount(){
    ingredients: this.props.getIngredients();
  }

	onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

	onSubmit = e => {
		e.preventDefault();
		const { title, time, price, servings, ingredients, tags, link } = this.state;
		const recipe = { title, time, price, servings, ingredients, tags, link };
		this.props.addRecipe(recipe);
	}

  changeState = (value) =>{
    this.setState({
      ingNames: this.state.ingNames.concat(' '+value),
      ingredients: this.state.ingredients.concat(4),
    }),
    this.setState(prevState =>({
          count: prevState.count + 1
        })),
    console.log(this.state.count)
  }
  
	 render() {
    const { title, time, price, servings, ingredients,ingNames } = this.state;
      
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Recipe</h2>
        <form >
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
            {ingNames}
            </pre>
            </div>
          <div className="form-group">
            <IngredientForm action={this.changeState} ingredients={ingredients}/>
          </div>

          <div className="form-group">
            <button type="submit" onClick = {this.onSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state =>({
        ingredients: state.recipes.ingredients
    })


export default connect(mapStateToProps, { getIngredients, addRecipe })(Form)