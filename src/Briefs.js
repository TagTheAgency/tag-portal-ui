import React, { Component } from 'react';
import Navigation from './Navigation.js';
import Service from './components/Service.js';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Briefs extends Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.createBrief = this.createBrief.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createBrief() {

  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  componentDidMount() {
    Service.getClients()
      .then(data => this.setState({"clients":data}));
  }


  render() {

    const { selectedOption } = this.state;

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
          </div>
        </div>
    );
  }
}


export default Briefs;
