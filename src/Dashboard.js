import React, { Component } from 'react';
import Navigation from './Navigation.js';
import logo from './logo.svg';
import './App.css';

class Dashboard extends Component {
  render() {
    return (
    	      <div className="App">
    	        <Navigation/>
    	        <header className="App-header">
    	          <img src={logo} className="App-logo" alt="logo" />
    	          <h1 className="App-title">Welcome to React</h1>
    	        </header>
    	        <p className="App-intro">
    	          To get started, edit <code>src/App.js</code> and save to reload.
    	        </p>
    	      </div>
    );
  }
}

export default Dashboard;
