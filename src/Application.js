import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Pitch from './Pitch.js';
import Briefs from './Briefs.js';
import FacebookApps from './FacebookApps.js';
import withAuth from './components/withAuth';
import Navigation from './Navigation.js';
import { Switch, Route } from "react-router-dom";

class Application extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
			<Switch>
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/pitch" component={Pitch} />
        <Route path="/briefs" component={Briefs} />
        <Route path="/catch" component={FacebookApps} />
				<Route component={Dashboard}/>
			</Switch>
    </div>
    );
  }
}

export default withAuth(Application);
