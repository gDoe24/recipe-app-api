import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from "../actions/auth";

import Dashboard from "./recipes/Dashboard";
import Login from "./users/Login";
import Register from "./users/Register";
import PrivateRoute from "./common/PrivateRoute"

class App extends Component {

	componentDidMount(){
		store.dispatch(loadUser());
	}

	render(){
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<div className="container">
							<Switch>
								<PrivateRoute exact path="/" component=
								{Dashboard} />
								<Route exact path="/register" component=
								{Register} />
								<Route exact path="/login" component=
								{Login} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));