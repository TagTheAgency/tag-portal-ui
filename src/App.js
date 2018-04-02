import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route,
	  Switch
	} from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import Pitch from './Pitch.js';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import { withRouter } from 'react-router';
import Application from './Application.js';

const Auth = new AuthService();


class App extends Component {
  render() {
    return (
    	<Router>
    		<Switch>
    			<Route path="/login" component={Login} />
					<Route path="/" component={Application} />
    		</Switch>
    	</Router>
    );
  }
}

export default App;
