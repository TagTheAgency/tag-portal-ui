import React, { Component } from 'react';
import Service from '../components/Service.js';

class CreateProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contactName: "",
      contactEmail: "",
      address: ""
    }

    this.doCreateClient = this.doCreateClient.bind(this);
    this.hideCreateClient = this.hideCreateClient.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);


  };


  hideCreateClient() {
    this.props.hideCreateClient();
  }

  doCreateClient() {
    console.log("Creating client with state ", this.state);
  }

  handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: value});

    }

    render() {
      if (!this.props.show) return <div><p><strong>Or</strong></p> <button className="btn btn-primary" onClick={this.props.doShow}>Create new client</button></div>;

    return (
    <div className="border-top my-3 py-3">
    <h3>Create new client</h3>
    <p>Please ensure the client does not already exist first!</p>
    <div className="form-group">
      <label htmlFor="clientName">Client Name</label>
      <input type="text" className="form-control" id="clientName" placeholder="Enter client name" value={this.state.name} name="name" onChange={this.handleInputChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="contactName">Contact Name</label>
      <input type="text" className="form-control" id="contactName" placeholder="Enter contact name" value={this.state.contactName} name="contactName" onChange={this.handleInputChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="contactEmail">Contact email</label>
      <input type="email" className="form-control" id="contactEmail" placeholder="name@example.com" value={this.state.contactEmail} name="contactEmail" onChange={this.handleInputChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="address">Client Address</label>
      <textarea className="form-control" id="address" rows="3" value={this.state.address} name="address" onChange={this.handleInputChange}></textarea>
    </div>
    <button type="submit" className="btn btn-primary" onClick={this.doCreateClient}>Create client</button>
    <button type="button" className="btn btn-danger" onClick={this.props.cancel}>Cancel</button>
      </div>
  )};
}

export default CreateProject;
