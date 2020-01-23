import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	render(){
		return <h1>React App</h1>
	}
}

var ReactDOM = require('react-dom');
React.render(<App />, document.getElementById('app'));