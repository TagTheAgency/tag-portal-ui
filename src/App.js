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
		const rootPath = process.env.PUBLIC_URL;
    return (
    	<Router>
    		<Switch>
    			<Route path={rootPath + "/login"} component={Login} />
					<Route path={rootPath + "/"} component={Application} />
    		</Switch>
    	</Router>
    );
  }
}

export default App;
