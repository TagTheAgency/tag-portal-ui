import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentication from './Authentication.js';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
		<Route {...rest} render={(props) => (
				Authentication.isAuthenticated() === true 
					? <Component {...props} />
					: <Redirect to={{
						pathname: '/login',
						state: {referrer: props.location}
					}} />
		)} />
);

export default AuthenticatedRoute;