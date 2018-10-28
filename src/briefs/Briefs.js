import React, { Component } from 'react';
import Service from '../components/Service.js';
import Select from 'react-select';
import CreateClient from './CreateClient.js';
import CreateProject from './CreateProject.js';
import TaskAssignment from './TaskAssignment.js';
import UserAssignment from './UserAssignment.js';
import 'react-select/dist/react-select.css';

class Briefs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreateClient:false,
      showCreateProject:false,
      hideDisabledProjects: false
    }

    this.createBrief = this.createBrief.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.showCreateClient = this.showCreateClient.bind(this);
    this.hideCreateClient = this.hideCreateClient.bind(this);
    this.showCreateProject = this.showCreateProject.bind(this);
    this.hideCreateProject = this.hideCreateProject.bind(this);
    this.doCreateClient = this.doCreateClient.bind(this);
    this.showHideDisabled = this.showHideDisabled.bind(this);
  }

  createBrief() {

  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    this.setState({"projects":[], projectUsers:null, projectTasks: null, showCreateProject:false});
    if (selectedOption != null) {
      Service.getProjects(selectedOption.id).then(data => this.setState({"projects":data}));
      this.setState({showCreateClient:false});
    }

  }

  showCreateClient() {
    this.setState({showCreateClient:true, selectedOption: null, projects:[],projectUsers:null, projectTasks: null, showCreateProject:false});
  }
  hideCreateClient() {
    this.setState({showCreateClient:false, showCreateProject:false});
  }
  showCreateProject() {
    this.setState({showCreateProject:true, projectUsers:null, projectTasks: null});
  }
  hideCreateProject() {
    this.setState({showCreateProject:false});
  }
  doCreateClient() {
    //this.showCreateClient();
    //todo
  }
  showHideDisabled() {
    this.setState({hideDisabledProjects: !this.state.hideDisabledProjects});
    console.log("Show hide disabled", this.state);
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


    /*const projects = this.state.projects != null && this.state.projects.length > 0 ? (
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
    ) : this.state.selectedOption == null ? (<p>First select a client</p>) : <button className="btn btn-primary">Create new project</button>; */

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
                <p><strong>Select project</strong> <input id="showHide" type="checkbox" onChange={this.showHideDisabled} /><label htmlFor="showHide">Hide disabled</label></p>
                <ProjectList selectedClient={this.state.selectedOption} projects={this.state.projects} onSelect={this.selectProject} hideDisabled={this.state.hideDisabledProjects} showCreateProject={this.showCreateProject}/>
                <CreateProject pushProject={this.doCreateClient} show={this.state.showCreateProject} doShow={this.showCreateProject} cancel={this.hideCreateProject}/>
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

const ProjectList = ({selectedClient, projects, onSelect, hideDisabled, showCreateProject}) => {
  //investigate https://medium.com/@dai_shi/attaching-state-to-stateless-function-components-in-react-db317a9e83ad

  if (selectedClient == null) {
    return (<p>First select a client</p>);
  }
  if (projects != null && projects.length > 0) {
    return (
      <div>

        <div className="list-group">
          {projects.map(el => {
            if (hideDisabled && !el.active) return;
            return (<button key={el.id} type="button" className={"list-group-item d-flex justify-content-between align-items-center " + (el.active ? "" : " disabled")} onClick={(e) => onSelect(el)}>
              {el.name}
              {el.billable ? <span className={"badge " + (el.fixedFee ? "badge-info" : "badge-success") + " badge-pill" }>{el.fixedFee ? "Fixed" : "T & M"}</span> : <span className="badge badge-warning badge-pill">non-billable</span>}
            </button>)})}
        </div>
        <p><strong>Or</strong></p> <button className="btn btn-primary" onClick={showCreateProject}>Create new project</button>
      </div>
    );
  }
  return (<button className="btn btn-primary" onClick={showCreateProject}>Create new project</button>);
}

export default Briefs;
