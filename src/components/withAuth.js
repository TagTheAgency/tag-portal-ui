import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(process.env.REACT_APP_API_ENDPOINT + '/security/');

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }

      this.logout = this.logout.bind(this);
    }

    componentWillMount() {
      const rootDir = process.env.PUBLIC_URL;
      if (!Auth.loggedIn()) {
        console.log("Not logged in, forwarding to login");

        this.props.history.replace({pathname: rootDir + '/login', state: { redirect: this.props.location.pathname }});
      }
      else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          })
        }
        catch(err){
          Auth.logout();
          this.props.history.replace(rootDir + '/login');
        }
      }
    }

    logout() {
      const rootDir = process.env.PUBLIC_URL;
      Auth.logout();
      this.props.history.replace(rootDir + '/login');
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} logout={this.logout}/>
        )
      }
      else {
        return null
      }
    }
  }


}
