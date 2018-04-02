import decode from 'jwt-decode';
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://localhost:82'
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login(token) {
    const form = new FormData();
    form.append("token", token);

    console.log(fetch, this.fetch);
    return fetch(`${this.domain}/tagportal/security/`, {
      method: 'POST',
      body: form
    })
    .then(response => response.json())
    .then(data => {
      console.log("Setting token with ", data);
      this.setToken(data.jwt) // Setting the token in localStorage
      return Promise.resolve(data);
    });
    //
    //
    //
    //
    // const form = new FormData();
    // form.append("token", token);
    // return fetch('http://localhost:82/tagportal/security/', {
    //   method: "POST",
    //   body: form
    // }).then(response => response.json());
  }

  loggedIn() {
    console.log("Checking loggedIn()");
    console.log(this.getToken());
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
      return false;
    }
    catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // token: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['token'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
