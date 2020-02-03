import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

import Dashboard from "./recipes/Dashboard";

class App extends Component {
	render(){
		return (
			<Provider store={store}>
			<Fragment>
				<Dashboard />
			</Fragment>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
