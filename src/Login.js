import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Authentication from './components/Authentication.js';

const responseGoogle = (response) => {
	console.log(response);
	Authentication.authenticate(response);
}

class Login extends Component {

	render() {
		if (Authentication.isAuthenticated()) {
			return (
				<Route>
					<Redirect to={{ pathname: '/dashboard' }} />
				</Route>
			)
		}
		return (
				<div>
				<GoogleLogin
					clientId="238046755257-ki0kkc04d49j1cr110n54dfakrgmtuh5.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
				/>
				</div>
		);
	}
}

export default Login;
