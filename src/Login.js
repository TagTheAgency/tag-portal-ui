import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
//import Authentication from './components/Authentication.js';
import AuthService from './components/AuthService';
import './Login.css';
var FontAwesome = require('react-fontawesome');
const rootPath = process.env.PUBLIC_URL;

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
	        this.props.history.replace(rootPath + '/dashboard');
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
					const redirect = this.props.location.state.redirect || (rootPath + '/dashboard');
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

			<div className="container-fluid primary login-page-container align-items-center vh-100">
				<div className="container">
					<div className="row justify-content-center login-main-content">
						<div className="col-12 col-md-6 row justify-content-center align-items-center img-container">
							<img id="login-img" src={rootPath+'img/hero.png'}/>
						</div>
						<div className="col-12 col-md-6 row login-details justify-content-center align-items-center">
							<div className="col-12 row justify-content-center">
								<div className="col-12">
									<h1>Portal</h1>
								</div>
								<GoogleLogin
									clientId="238046755257-ki0kkc04d49j1cr110n54dfakrgmtuh5.apps.googleusercontent.com"
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
									className="login-button row"
								>
									<span>Login with Google</span>
								</GoogleLogin>
								{errorMessage}
							</div>
						</div>
					</div>
					<div className="row justify-content-center login-footer">
						<div className="col-auto">
							<p>© small copyright text or something</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
