import React, { Component } from 'react';
import Service from '../components/Service.js';
import Select from 'react-select';
import CreateClient from './CreateClient.js';
import 'react-select/dist/react-select.css';

class Briefs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreateClient:false
    }

    this.createBrief = this.createBrief.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.showCreateClient = this.showCreateClient.bind(this);
    this.hideCreateClient = this.hideCreateClient.bind(this);
    this.doCreateClient = this.doCreateClient.bind(this);
  }

  createBrief() {

  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    this.setState({"projects":[]});
    if (selectedOption != null) {
      Service.getProjects(selectedOption.id).then(data => this.setState({"projects":data}));
      this.setState({showCreateClient:false});
    }

  }

  showCreateClient() {
    this.setState({showCreateClient:true, selectedOption: null, projects:[]});
  }
  hideCreateClient() {
    this.setState({showCreateClient:false});
  }
  doCreateClient() {
    this.showCreateClient();
    //todo
  }

  selectProject(project) {
    console.log('selecting project', project);
    Service.getProjectUsers(project.id);
    Service.getProjectTasks(project.id);
  }

  componentDidMount() {
    Service.getClients()
      .then(data => this.setState({"clients":data}));
  }



  render() {

    const { selectedOption, selectedProject } = this.state;
    console.log(selectedProject);

    const projects = this.state.projects != null && this.state.projects.length > 0 ? (
      <div>
        <div className="list-group">
          {this.state.projects.map(el => <button key={el.code} type="button" className="list-group-item list-group-item-action" onClick={(e) => this.selectProject(el)}>{el.name}</button>)}
        </div>
        <p><strong>Or</strong></p> <button className="btn btn-primary">Create new project</button>
      </div>
    ) : this.state.selectedOption == null ? (<p>First select a client</p>) : <button className="btn btn-primary">Create new project</button>;

    return (
        <div className="content-wrapper">
          <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <p><strong>Select client</strong></p>
                <Select
                  name="form-field-name"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={this.state.clients}
                  valueKey="id"
                  labelKey="name"
                />
              <CreateClient pushClient={this.doCreateClient} show={this.state.showCreateClient} doShow={this.showCreateClient} cancel={this.hideCreateClient}/>
              </div>
              <div className="col-sm-4">
              <p><strong>Select project</strong></p>
              {projects}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">

              </div>
            </div>
          </div>
        </div>
    );
  }
}
/*
const CreateClient = ({doCreateClient, cancel}) => {
  const create = doCreateClient;
  const hide = cancel;

  const newClient = {
    name: "",
    contactName: "",
    contactEmail: "",
    address: ""
  }

  const handleInputChange = (event) => {
    console.log("Handling an input change with event ", event.target, event.target.value, event.target.name);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newClient[name] = value;

    newClient.name="Kittens";
    console.log(newClient);
    //his.setState({});
  }

  return (
  <div className="border-top my-3 py-3">
  <h3>Create new client</h3>
  <p>Please ensure the client does not already exist first!</p>
  <div className="form-group">
    <label htmlFor="clientName">Client Name</label>
    <input type="text" className="form-control" id="clientName" placeholder="Enter client name" value={newClient.name} name="name" onChange={handleInputChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="contactName">Contact Name</label>
    <input type="text" className="form-control" id="contactName" placeholder="Enter contact name" value={newClient.contactName} name="contactName" onChange={handleInputChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="contactEmail">Contact email</label>
    <input type="email" className="form-control" id="contactEmail" placeholder="name@example.com" value={newClient.contactEmail} name="contactEmail" onChange={handleInputChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="address">Client Address</label>
    <textarea className="form-control" id="address" rows="3" value={newClient.address} name="address" onChange={handleInputChange}></textarea>
  </div>
  <button type="submit" className="btn btn-primary" onClick={() => create()}>Create client</button>
  <button type="button" className="btn btn-danger" onClick={() => hide()}>Cancel</button>
    </div>
)};*/

export default Briefs;
