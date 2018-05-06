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
      if (!Auth.loggedIn()) {
        console.log("Not logged in, forwarding to login");
        this.props.history.replace({pathname: '/login', state: { redirect: this.props.location.pathname }});
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
          this.props.history.replace('/login');
        }
      }
    }

    logout() {
      Auth.logout();
      this.props.history.replace('/login');
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
