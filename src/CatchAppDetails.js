import React, { Component } from 'react';
import BootstrapCard from './components/BootstrapCard.js';
import ReactTooltip from 'react-tooltip';
import Service from './components/Service.js';
import './FacebookApplication.css';

class CatchAppDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropboxBase:'/TAG the agency Team Folder/Applications/',
      termsHeight:'50px',
      templates:[]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.stripDropbox = this.stripDropbox.bind(this);
    this.focusTerms = this.focusTerms.bind(this);
    this.blurTerms = this.blurTerms.bind(this);



  }

  componentDidMount() {
    Service.getFacebookTemplates().then(data => {
      this.setState({templates:data});
    });
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

  focusTerms(e) {
    this.setState({termsHeight:'300px'});
  }

  blurTerms(e) {
    this.setState({termsHeight:'50px'});
  }

  render() {

    const name = this.props.app.name == null ? '' : this.props.app.name;
    const facebookId = typeof(this.props.app.facebookId) === 'undefined' ? 0 : this.props.app.facebookId;
    const facebookPath = this.props.app.facebookPath == null ? '' : this.props.app.facebookPath;
    const dropboxPath = this.stripDropbox(this.props.app.dropboxPath);
    const uri = this.props.app.uri == null ? '' : process.env.REACT_APP_CATCH_ENDPOINT + '/app/' + this.props.app.uri + '/page';
    const terms = this.props.app.terms == null ? '' : this.props.app.terms;
    const template = this.props.app.template == null ? '' : this.props.app.template;

    return (
    <BootstrapCard initial={false} heading="Application setup" body={[
      <div className="form-group row" key="1">
        <label className="col-form-label col-sm-3">Application name:</label>
        <div className="col-sm-9"><input readOnly className="form-control-plaintext" type="text" value={name} onChange={this.handleInputChange}/></div>
      </div>,
      <div className="form-group row" key="2">
        <label className="col-form-label col-sm-3">Facebook id:</label>
        <div className="col-sm-8"><input name="facebookId" className="form-control" type="text" value={facebookId} onChange={this.handleInputChange} /></div>
        <div className="col-sm-1 pt-2"><a data-tip data-for='facebookIdHelp'><i className="fa fa-question-circle" aria-hidden="true"></i><span className="sr-only">Help</span></a></div>
          <ReactTooltip id='facebookIdHelp' type='info' place='left'>
            <h3>Facebook id</h3>
            <p>This is the unique id of the Facebook page you want to embed this <em>Catch</em> app in.</p>
            <p>(You must have permissions for the page).</p>
            <ol>
              <li>Log into facebook and open the client's page</li>
              <li>Go to the 'about' tab </li>
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
      </div>,
      <div className="form-group row" key="6">
        <label className="col-form-label col-sm-3">Choose template</label>
        <select name="template" onChange={this.handleInputChange} value={template}>
            <option value={''}>Select a template to customise</option>
            {this.state.templates.map((template, index) => (<option key={index} value={template}>{template}</option>))}
          </select>
      </div>,
      <div className="form-group row" key="7">
        <label className="col-form-label col-sm-3">Terms and Conditions</label>
        <textarea name="terms" className="col-sm-9" style={{height:this.state.termsHeight, transition:'height 200ms'}} ref={ref => this.termsAreaRef = ref} onFocus={this.focusTerms} onBlur={this.blurTerms} onChange={this.handleInputChange} value={terms}></textarea>
      </div>
      ]
    }/>
  );
  }
}


export default CatchAppDetails;
