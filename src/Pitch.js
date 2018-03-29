import React, { Component } from 'react';
import Navigation from './Navigation.js';
import { Route, Link } from "react-router-dom";
import PitchItem from "./PitchItem.js";
import BreadCrumbs from "./components/BreadCrumbs.js";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  }]

  const pitchRoot = `${process.env.PUBLIC_URL}/pitch`;

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
      Cell: props => <a href={pitchRoot + '/' + props.row.id} title="Edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
    }, {
      Header: 'Download',
      accessor: 'id',
      maxWidth: 40,
      Cell: props => <a target="_blank" href={'http://localhost:82/' + props.row.id + '/' + props.row.title + '.pdf'} title="Download PDF"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></a>
    }]
  }];


const pitches = [
    { id: 0, name: "Michelle", friends: [1, 2, 3] },
    { id: 1, name: "Sean", friends: [0, 3] },
    { id: 2, name: "Kim", friends: [0, 1, 3] },
    { id: 3, name: "David", friends: [1, 2] }
]

class Pitch extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    fetch('http://localhost:82/tagportal/')
      .then(response => response.json())
      .then(data => this.setState({"pitches":data}));
  }


  render() {
    console.log(this.props);
    console.log(pitches);
    return (
      <div className="App">
        <Navigation/>
        <div className="content-wrapper">
        <Route path={`${this.props.match.url}/`} exact render={(props)=><PitchList {...props} pitches={this.state.pitches}/>} />
        <Route path={`${this.props.match.url}/:id`} component={PitchItem} />
        </div>
      </div>
    );
  }
}

const PitchList = ({ match, pitches }) => (
  <div>
    <BreadCrumbs elements={[{"link":"pitch", "name":"Pitches"}]} />
  <div className="container-fluid">

      <div className="row">
      <div className="col-12">
        <h1>Pitch Tool</h1>
        <p>Here you can see and modify existing pitches, or create new ones.</p>
        <Link className="btn btn-primary" to={`${match.url}/create`}>Create new pitch</Link>
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
