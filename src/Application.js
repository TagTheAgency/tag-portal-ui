import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Pitch from './Pitch.js';
import withAuth from './components/withAuth';
import { Switch, Route } from "react-router-dom";

class Application extends Component {
  render() {
    return (
			<Switch>
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/pitch" component={Pitch} />
				<Route component={Dashboard}/>
			</Switch>
    );
  }
}

export default withAuth(Application);
