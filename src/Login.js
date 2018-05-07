import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
//import Authentication from './components/Authentication.js';
import AuthService from './components/AuthService';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false
		};

		this.responseGoogle = this.responseGoogle.bind(this);

		this.Auth = new AuthService();

	}

	componentWillMount() {
	    if(this.Auth.loggedIn()) {
	        this.props.history.replace('/dashboard');
			}
	}

	responseGoogle(response) {
		console.log(response);

		if (response && response.tokenId) {

			this.Auth.login(response.tokenId)
        .then(res =>{
					if (res.error) {
						alert(res.error);
						return;
					}
					const redirect = this.props.location.state.redirect || '/dashboard';
//					console.log('replacing this.props.history', this.props.history);
           this.props.history.replace(redirect);
        })
        .catch(err =>{
            alert(err);
        })
			}
	};

	render() {
		console.log("Login is rendering");
		console.log(this.props.location);

		const errorMessage = this.state.error ? (<div className="alert alert-danger" role="alert">Error: {this.state.error}</div>) : null;
		return (

				<div>
				<GoogleLogin
					clientId="238046755257-ki0kkc04d49j1cr110n54dfakrgmtuh5.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
				/>
				{errorMessage}
				</div>
		);
	}
}

export default Login;
