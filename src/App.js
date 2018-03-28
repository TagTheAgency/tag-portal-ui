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

class App extends Component {
  render() {
    return (
    	<Router>
    		<Switch>
    			<Route path="/login" component={Login} />
    			<AuthenticatedRoute path="/dashboard" component={Dashboard} />
					<AuthenticatedRoute path="/pitch" component={Pitch} />
    			<AuthenticatedRoute component={Dashboard}/>
    		</Switch>
    	</Router>
    );
  }
}

export default App;
