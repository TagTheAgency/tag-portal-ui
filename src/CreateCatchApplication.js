import React, { Component } from 'react';
import BootstrapCard from './components/BootstrapCard.js';
import Service from './components/Service.js';
import './FacebookApplication.css';

class CreateCatchApplication extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createApplication = this.createApplication.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({name:value});
  }

  createApplication() {
    if (this.state.name.length < 1) {
      return;
    }

    Service.createCatchApplication(this.state.name)
    .then(data => {
      this.props.history.push('/catch/'+data.id);
    });

  }

  cancel() {
    this.props.history.push('../catch');
  }


  render() {

    return (
      <div className="row justify-content-md-center">
        <div className="col-lg-8">
    <BootstrapCard initial={true} heading="Create application" body={(
      <div className="form-group row">
        <label className="col-form-label col-sm-3">Application name:</label>
        <div className="col-sm-5"><input className="form-control" type="text" value={this.state.name} onChange={this.handleInputChange}/></div>
        <div className="col-sm-4"><button className="btn btn-primary mr-4" onClick={this.createApplication}>Create Application</button><button className="btn btn-danger" onClick={this.cancel}>Cancel</button></div>
      </div>
    )}/></div>
    </div>
  );
  }
}


export default CreateCatchApplication;
