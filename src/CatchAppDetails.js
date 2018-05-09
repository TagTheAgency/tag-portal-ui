import React, { Component } from 'react';
import Service from './components/Service.js';
import BootstrapCard from './components/BootstrapCard.js';
import ReactTable from 'react-table';
import ReactTooltip from 'react-tooltip';
import './FacebookApplication.css';

class CatchAppDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {dropboxBase:'/TAG the agency Team Folder/Applications/'};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.stripDropbox = this.stripDropbox.bind(this);

  }

  stripDropbox(val) {
    if (val == null) {
      return '';
    }
    if (val.length < this.state.dropboxBase.length) {
      return 'Error!'
    }
    return val.substring(this.state.dropboxBase.length);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'facebookId') {
      if (value === '') {
        this.props.change({name: 'facebookId', value: 0});
        return;
      }
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) {
      } else {
        this.props.change({name: 'facebookId', value: parsed});
      }
      return;
    }

    if (name === 'dropboxPath') {
      this.props.change({name: 'dropboxPath', value: '/TAG the agency Team Folder/Applications/' + value});
      return;
    }

    this.props.change({name: name, value: value});
  }

  render() {

    const name = this.props.app.name == null ? '' : this.props.app.name;
    const facebookId = typeof(this.props.app.facebookId) === 'undefined' ? 0 : this.props.app.facebookId;
    const facebookPath = this.props.app.facebookPath == null ? '' : this.props.app.facebookPath;
    const dropboxPath = this.stripDropbox(this.props.app.dropboxPath);
    const uri = this.props.app.uri == null ? '' : this.props.app.uri;

    return (
    <BootstrapCard heading="Application setup" body={[
      <div className="form-group row" key="1">
        <label className="col-form-label col-sm-3">Application name:</label>
        <div className="col-sm-9"><input readOnly className="form-control-plaintext" type="text" value={name} onChange={this.handleInputChange}/></div>
      </div>,
      <div className="form-group row" key="2">
        <label className="col-form-label col-sm-3">Facebook id:</label>
        <div className="col-sm-8"><input name="facebookId" className="form-control" type="text" value={facebookId} onChange={this.handleInputChange} /></div>
        <div className="col-sm-1 pt-2"><a data-tip data-for='facebookIdHelp'><i className="fa fa-question-circle" aria-hidden="true"></i></a></div>
          <ReactTooltip id='facebookIdHelp' type='info' place='left'>
            <h3>Facebook id</h3>
            <p>This is the unique id of the Facebook page you want to embed this <em>Catch</em> app in</p>
            <ol>
              <li>Log into facebook and open the client's page</li>
              <li>Go to the 'about' tab</li>
              <li>Scroll to the bottom to find the page id</li>
              <li>Copy and paste it here</li>
            </ol>
          </ReactTooltip>
      </div>,
      <div className="form-group row" key="3">
        <label className="col-form-label col-sm-3">Facebook path:</label>
        <div className="col-sm-8"><input name="facebookPath" className="form-control" type="text" value={facebookPath} onChange={this.handleInputChange} placeholder="eg. TAGTheAgency"/></div>
        <div className="col-sm-1 pt-2"><i className="fa fa-question-circle" aria-hidden="true"></i></div>
      </div>,
      <div className="form-group row" key="4">
        <label className="col-form-label col-sm-3">Direct link:</label> <div className="col-sm-9"><input readOnly className="form-control-plaintext" type="text" value={uri} onChange={this.handleInputChange}/></div>
      </div>,
      <div className="form-group row" key="5">
        <label className="col-form-label col-sm-3">Dropbox path (if applicable):</label>
        <div name="dropboxPath" className="col-sm-4 form-control-plaintext">/TAG the agency Team Folder/Applications/</div>
        <div className="col-sm-4"><input name="dropboxPath" className="form-control" type="text" value={dropboxPath} onChange={this.handleInputChange}/></div>
      </div>  ]
    }/>
  );
  }
}


export default CatchAppDetails;
