import React, { Component } from 'react';
import {
	  BrowserRouter as Router,
	  Route,
	  Switch
	} from "react-router-dom";
import Login from './Login.js';
import './App.css';
import Application from './Application.js';

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
