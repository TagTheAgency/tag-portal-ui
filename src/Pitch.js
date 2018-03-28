import React, { Component } from 'react';
import Navigation from './Navigation.js';
import { Route, Link } from "react-router-dom";
import PitchItem from "./PitchItem.js";
import BreadCrumbs from "./components/BreadCrumbs.js";
const pitches = [
    { id: 0, name: "Michelle", friends: [1, 2, 3] },
    { id: 1, name: "Sean", friends: [0, 3] },
    { id: 2, name: "Kim", friends: [0, 1, 3] },
    { id: 3, name: "David", friends: [1, 2] }
]

class Pitch extends Component {
  render() {
    console.log(this.props);
    console.log(pitches);
    return (
      <div className="App">
        <Navigation/>
        <div className="content-wrapper">
        <Route path={`${this.props.match.url}/`} exact component={PitchList} />
        <Route path={`${this.props.match.url}/:id`} component={PitchItem} />
        </div>
      </div>
    );
  }
}

const PitchList = ({ match }) => (
  <div>
    <BreadCrumbs elements={[{"link":"pitch", "name":"Pitches"}]} />
  <div className="container-fluid">
    {/* Breadcrumbs */}
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="pitch">Pitches</Link>
      </li>
    </ol>

      <div className="row">
      <div className="col-12">
        <h1>Pitch Tool</h1>
        <p>Here you can see and modify existing pitches, or create new ones.</p>
        <Link className="btn btn-primary" to={`${match.url}/create`}>Create new pitch</Link>
      </div>
    </div>
  </div>


    <h2>Pitches</h2>
    {pitches.map((pitch) => {
      return (
          <li key={pitch.id}>
            <Link to={`${match.url}/${pitch.id}`}>{pitch.name}</Link>
          </li>
        )})}
  </div>

);



export default Pitch;
