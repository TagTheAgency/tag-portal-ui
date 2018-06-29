import React, { Component } from 'react';
import Service from '../components/Service.js';
import Select from 'react-select';
import CreateClient from './CreateClient.js';
import TaskAssignment from './TaskAssignment.js';
import UserAssignment from './UserAssignment.js';
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
    this.setState({"projects":[], projectUsers:null, projectTasks: null});
    if (selectedOption != null) {
      Service.getProjects(selectedOption.id).then(data => this.setState({"projects":data}));
      this.setState({showCreateClient:false});
    }

  }

  showCreateClient() {
    this.setState({showCreateClient:true, selectedOption: null, projects:[],projectUsers:null, projectTasks: null});
  }
  hideCreateClient() {
    this.setState({showCreateClient:false});
  }
  doCreateClient() {
    //this.showCreateClient();
    //todo
  }

  selectProject(project) {
    Service.getProjectUsers(project.id).then(data => this.setState({"projectUsers":data}));
    Service.getProjectTasks(project.id).then(data => this.setState({"projectTasks":data}));
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
          {this.state.projects.map(el =>
            <button key={el.code} type="button" className={"list-group-item d-flex justify-content-between align-items-center " + (el.active ? "" : " disabled")} onClick={(e) => this.selectProject(el)}>
              {el.name}
              {el.billable ? [<span className={"badge " + (el.fixedFee ? "badge-info" : "badge-success") + " badge-pill" }>{el.fixedFee ? "Fixed" : "T & M"}</span>] : <span className="badge badge-warning badge-pill">non-billable</span>}
            </button>)}
        </div>
        <p><strong>Or</strong></p> <button className="btn btn-primary">Create new project</button>
      </div>
    ) : this.state.selectedOption == null ? (<p>First select a client</p>) : <button className="btn btn-primary">Create new project</button>;

    const projectTasks = this.state.projectTasks == null ? null : [<p><strong>Project Tasks</strong></p>,<ul className="list-group">{this.state.projectTasks.map(el => <TaskAssignment key={el.id} task={el}/>)}</ul>];
    const projectUsers = this.state.projectUsers == null ? null : [<p><strong>Project Staff</strong></p>,<ul className="list-group">{this.state.projectUsers.map(el => <UserAssignment key={el.id} user={el}/>)}</ul>];


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
                <ProjectList selectedClient={this.state.selectedOption} projects={this.state.projects} onSelect={this.selectProject} />
              </div>
              <div className="col-sm-4">
                {projectTasks}
                {projectUsers}
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
const clientList = () => {

}

const ProjectList = ({selectedClient, projects, onSelect}) => {
  //investigate https://medium.com/@dai_shi/attaching-state-to-stateless-function-components-in-react-db317a9e83ad
  const show = {hideDisabled:false};

  const showHideDisabled = () => {show.hideDisabled = !show.hideDisabled;}

  if (selectedClient == null) {
    return (<p>First select a client</p>);
  }
  if (projects != null && projects.length > 0) {
    return (
      <div>
        <input id="showHide" type="checkbox" onClick={(e) => showHideDisabled} /><label htmlFor="showHide">Hide disabled</label>
        <div className="list-group">
          {projects.map(el => {
            if (show.showHide && !el.active) return;
            return (<button key={el.code} type="button" className={"list-group-item d-flex justify-content-between align-items-center " + (el.active ? "" : " disabled")} onClick={(e) => onSelect(el)}>
              {el.name}
              {el.billable ? [<span className={"badge " + (el.fixedFee ? "badge-info" : "badge-success") + " badge-pill" }>{el.fixedFee ? "Fixed" : "T & M"}</span>] : <span className="badge badge-warning badge-pill">non-billable</span>}
            </button>)})}
        </div>
        <p><strong>Or</strong></p> <button className="btn btn-primary">Create new project</button>
      </div>
    );
  }
  return (<button className="btn btn-primary">Create new project</button>);
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
