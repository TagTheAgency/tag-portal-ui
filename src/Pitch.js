import React, { Component } from 'react';
import { Route } from "react-router-dom";
import PitchItem from "./PitchItem.js";
import BreadCrumbs from "./components/BreadCrumbs.js";
import ReactTable from 'react-table';
import Service from './components/Service.js';
import 'react-table/react-table.css'

  const pitchRoot = `${process.env.PUBLIC_URL}/pitch`;

  const downloadPdf = (id, title) => {
    console.log(id, title);
    Service.downloadPdf(id, title)
  }

  const columns = [{
    Header: 'Title',
    accessor: 'title', // String-based value accessors!
    Cell: props => <a href={pitchRoot + '/' + props.row.id} title="Edit">{props.value}</a>
  }, {
    Header: 'Created By',
    accessor: 'createdUser'
  }, {
    id: 'createdDate', // Required because our accessor is not a string
    Header: 'Created Date',
    accessor: 'createdDate',
    Cell: props => <span className='date'>{new Date(props.value).toLocaleDateString()}</span>
  }, {
    Header: 'Actions',
    columns: [{
      Header: 'Edit',
      accessor: 'id',
      maxWidth: 40,
      Cell: props => <a href={pitchRoot + '/' + props.row.id} title="Edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i><span className="sr-only">Edit</span></a>
    }, {
      Header: 'Download',
      accessor: 'id',
      maxWidth: 40,
      Cell: props => <a style={{cursor:"pointer"}} target="_blank" onClick={() => downloadPdf(props.row.id, props.row.title)} title="Download PDF"><i className="fa fa-file-pdf-o" aria-hidden="true"></i><span className="sr-only">Download PDF</span></a>
    }]
  }];


class Pitch extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.createPitch = this.createPitch.bind(this);
  }

  createPitch() {
    Service.createPitch()
    .then(data => {
      const pitches = this.state.pitches;
      pitches.push(data);
      this.setState({"pitches":pitches});
      this.props.history.replace('/pitch/'+data.id);

    });
  }

  componentDidMount() {
    Service.getPitches()
      .then(data => this.setState({"pitches":data}));
  }


  render() {
    return (

        <div className="content-wrapper">
        <Route path={`${this.props.match.url}/`} exact render={(props)=><PitchList {...props}  createPitch={this.createPitch} pitches={this.state.pitches}/>} />
        <Route path={`${this.props.match.url}/:id`} component={PitchItem}/>
        </div>
    );
  }
}

const PitchList = ({ match, pitches, createPitch }) => (
  <div>
    <BreadCrumbs elements={[{"link":"pitch", "name":"Pitches"}]} />
      <div className="container-fluid">

        <div className="row">
        <div className="col-12">
          <h1>Pitch Tool</h1>
          <p>Here you can see and modify existing pitches, or create new ones.</p>
          <button className="btn btn-primary" onClick={createPitch}>Create new pitch</button>
        </div>
      </div>
      <ReactTable
        data={pitches}
        columns={columns}
      />
    </div>

  </div>

);



export default Pitch;
