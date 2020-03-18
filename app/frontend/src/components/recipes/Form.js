import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'react-uuid'
import { addRecipe, getIngredients } from "../../actions/recipes.js";
import IngredientForm from './IngredientForm';
import Tags from "./Tags";


export class Form extends Component {

  
constructor(){
  super();

  this.state={
    title: 'Kobe',
    time: '2',
    price: '4',
    servings: '8',
    ingredients: [184,],
    tags:[1,],
    description:'A dish best served cold',
    methods:'Step 1: x \n Step 2: y',
    image: '',
    link: "",
    ingNames:" ",
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
		const { title, time, price, servings, ingredients, tags, 
      description, methods, image, link } = this.state;
		const recipe = { title, time, price, servings, ingredients, tags,
      description, methods, image, link };
		this.props.addRecipe(recipe);
	}


  sortFunction = (a,b) =>{
    return b-a
  }
  
  changeState = (value) =>{
    this.setState({
      ingNames: this.state.ingNames.concat(' '+value),
      ingredients: this.state.ingredients.concat(this.props.ingredients.map((a)=>{
          return a.id
        }).sort(this.sortFunction)[0] + 1
      )
    })
  }

  getId = (value) =>{
    this.setState({
      tags: [value]
    })
  }

  imageChange = e =>{
    this.setState({
      image: e.target.files[0]
    })
  }
  
	 render() {
    const { title, time, price, servings, ingredients,ingNames, tags, description,
    methods, image } = this.state;
      
    return (
      <div className="container form-container">
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
            <label >Description</label>
            <textarea className="form-control" 
            id="exampleFormControlTextarea1" 
            rows="3"
            name="description"
            onChange={this.onChange}
            value={description}>
            </textarea>
          </div>
          <div className="form-group">
            <label >Methods</label>
            <textarea className="form-control" 
            id="exampleFormControlTextarea1" 
            rows="5"
            name="methods"
            onChange={this.onChange}
            value={methods}>
            </textarea>
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
            <Tags action={this.getId}/>
          </div>
           <div class="form-group">
            <label>Image</label>
            <input type="file"
            className="form-control-file"
            id="image"
            name="image"
            onChange={this.imageChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" onClick = {this.onSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
        ingredients: state.recipes.ingredients,
    })


export default connect(mapStateToProps, { getIngredients, addRecipe })(Form)