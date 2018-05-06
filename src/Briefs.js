import React, { Component } from 'react';
import Service from './components/Service.js';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Briefs extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.createBrief = this.createBrief.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectProject = this.selectProject.bind(this);
  }

  createBrief() {

  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    this.setState({"projects":[]});
    if (selectedOption != null) {
      Service.getProjects(selectedOption.id).then(data => this.setState({"projects":data}));
    }

  }

  selectProject(project) {

  }

  componentDidMount() {
    Service.getClients()
      .then(data => this.setState({"clients":data}));
  }


  render() {

    const { selectedOption, selectedProject } = this.state;
    console.log(selectedProject);

    const projects = this.state.projects != null && this.state.projects.length > 0 ? (
      <div className="list-group">
        {this.state.projects.map(el => <button key={el.code} type="button" className="list-group-item list-group-item-action" onClick={this.selectProject}>{el.name}</button>)}
      </div>

    ) : null;

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
              </div>
              <div className="col-sm-4">
              <p>Or <button className="btn btn-primary">Create new client</button></p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
              {projects}
              </div>
            </div>
          </div>
        </div>
    );
  }
}


export default Briefs;
