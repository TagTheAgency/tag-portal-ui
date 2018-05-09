import React, { Component } from 'react';
import Service from './components/Service.js';
import ReactTable from 'react-table';
import FacebookApplication from './FacebookApplication.js';
import BreadCrumbs from "./components/BreadCrumbs.js";

import { Route } from "react-router-dom";

import 'react-select/dist/react-select.css';

const catchRoot = `${process.env.PUBLIC_URL}/catch`;

const showEntries = (id) => {
  Service.getCatchEntries(id).then(data => console.log(data));
}

const columns = [{
  Header: 'Title',
  accessor: 'name', // String-based value accessors!
  Cell: props => {return (<a href={catchRoot + '/' + props.original.id} title="Edit">{props.value}</a>)}
}, {
  Header: 'Status',
  maxWidth: 150,
  accessor: 'status'
}, {
  Header: 'Dropbox path',
  accessor: 'dropboxPath'
}, {
  Header: 'Facebook account',
  accessor: 'facebookPath'
}, {
  Header: 'Entries',
  accessor: 'entries',
  maxWidth: 100,
  Cell: props => <a style={{cursor:"pointer"}} onClick={() => {showEntries(props.original.id)}} title="Download CSV"><i className="fa fa-file-excel-o" aria-hidden="true"></i><span className="sr-only">Download CSV</span></a>

}

];

class FacebookApps extends Component {

constructor(props) {
  super(props);
  this.state = {}

  this.createApplication = this.createApplication.bind(this);
}

createApplication() {
  Service.createCatchApplication("Untitled")
  .then(data => {
    const applications = this.state.applications;
    applications.push(data);
    this.setState({"applications":applications});
    this.props.history.replace('/catch/'+data.id);

  });
}

componentDidMount() {
  Service.getFacebookApps()
    .then(data => this.setState({"applications":data}));
}


render() {
  return (

      <div className="content-wrapper">
      <Route path={`${this.props.match.url}/`} exact render={(props)=><ApplicationList {...props}  createApplication={this.createApplication} applications={this.state.applications}/>} />
      <Route path={`${this.props.match.url}/:id`} component={FacebookApplication} />
      </div>
  );
}



}



const ApplicationList = ({ match, applications, createApplication }) => (
<div>
  <BreadCrumbs elements={[{"link":"pitch", "name":"Pitches"}]} />
    <div className="container-fluid">

      <div className="row">
      <div className="col-12">
        <h1>Catch</h1>
        <h2>Facebook apps for clients</h2>
        <p>Here you can see and modify Catch applications, or create new ones.</p>
        <button className="btn btn-primary" onClick={createApplication}>Create new application</button>
      </div>
    </div>
    <ReactTable
      data={applications}
      columns={columns}
    />
  </div>

</div>

);

export default FacebookApps;
