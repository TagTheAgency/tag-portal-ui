import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Pitch from './Pitch.js';
import Briefs from './briefs/Briefs.js';
import Trends from './Trends.js';
import Instagram from './Instagram.js';
import FacebookApps from './FacebookApps.js';
import withAuth from './components/withAuth';
import Navigation from './Navigation.js';
import { Switch, Route } from "react-router-dom";

class Application extends Component {
  render() {
    const rootPath = process.env.PUBLIC_URL;
    return (
      <div className="App">
        <Navigation logout={this.props.logout} />
			<Switch>
				<Route path={rootPath + "/dashboard"} component={Dashboard} />
				<Route path={rootPath + "/pitch"} component={Pitch} />
        <Route path={rootPath + "/briefs"} component={Briefs} />
        <Route path={rootPath + "/trends"} component={Trends} />
        <Route path={rootPath + "/catch"} component={FacebookApps} />
        <Route path={rootPath + "/insta"} component={Instagram} />
				<Route component={Dashboard}/>
			</Switch>
    </div>
    );
  }
}

export default withAuth(Application);
