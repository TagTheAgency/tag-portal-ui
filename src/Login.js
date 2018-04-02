import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
//import Authentication from './components/Authentication.js';
import decode from 'jwt-decode';
import AuthService from './components/AuthService';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.responseGoogle = this.responseGoogle.bind(this);

		this.Auth = new AuthService();

	}

	componentWillMount(){
	    if(this.Auth.loggedIn())
	        this.props.history.replace('/dashboard');
	}

	responseGoogle(response) {
		console.log(response);

		if (response && response.tokenId) {

			this.Auth.login(response.tokenId)
        .then(res =>{
					console.log('replacig this.props.history', this.props.history);
           this.props.history.replace('/dashboard');
        })
        .catch(err =>{
            alert(err);
        })
			}
//
// 			Authentication.exchangeToken(response.tokenId)
// 			.then(data => {
// 				if (data.jwt) {
// 					sessionStorage.setItem("jwt", data.jwt);
// 					this.setState({'jwt': data.jwt});
// //					this.setState({'error': undefined});
// 				}
// 				if (data.error) {
// 					this.setState({'error': data.error});
// 					this.setState({'jwt': undefined});
// 				}
// 				console.log(data);
// 			})
// 		}
	};

	render() {
		if (this.state.jwt) {
			return (
				<Route>
					<Redirect to={{ pathname: '/dashboard' }} />
				</Route>
			)
		}
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
