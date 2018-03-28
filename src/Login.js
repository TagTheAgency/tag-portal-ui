import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
	console.log(response);
}

class Login extends Component {


	render() {
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
