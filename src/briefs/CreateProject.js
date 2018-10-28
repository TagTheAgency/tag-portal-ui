import React, { Component } from 'react';
import Service from '../components/Service.js';

class CreateProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      billable: true,
      fixedFee: false,
      tasks: [],
      team: []
    }

    this.doCreateProject = this.doCreateProject.bind(this);
    this.hideCreateProject = this.hideCreateProject.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  };


  hideCreateProject() {
    this.props.hideCreateProject();
  }

  doCreateProject() {
    console.log("Creating project with state ", this.state);
  }

  handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({[name]: value});

    }

    render() {
      if (!this.props.show) return null;
    return (
    <div className="border-top my-3 py-3">
    <h3>Create new project</h3>
    <div className="form-group">
      <label htmlFor="clientName">Project Name</label>
      <input type="text" className="form-control" id="clientName" placeholder="Enter client name" value={this.state.name} name="name" onChange={this.handleInputChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="contactName">Billable</label>
      <input type="checkbox" className="form-control" value={this.state.billable} name="billable" onChange={this.handleInputChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="contactEmail">Fixed fee</label>
      <input type="checkbox" className="form-control" value={this.state.fixedFee} name="fixedFee" onChange={this.handleInputChange}/>
    </div>

    <button type="submit" className="btn btn-primary" onClick={this.doCreateProject}>Create project</button>
    <button type="button" className="btn btn-danger" onClick={this.props.cancel}>Cancel</button>
      </div>
  )};
}

export default CreateProject;
