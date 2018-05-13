import React, { Component } from 'react';
import Service from './components/Service.js';
import BootstrapCard from './components/BootstrapCard.js';
import ReactTable from 'react-table';
import CatchAppDetails from './CatchAppDetails.js';
import './FacebookApplication.css';

const catchBase = process.env.REACT_APP_CATCH_ENDPOINT + '/app/';


class FacebookApplication extends Component {

  constructor(props) {

    super(props);

    this.state = {
        id: -1,
        uri: '',
        name: '',
        application: {
          id: -1,
          uri: '',
          name: ''
        },
        notFound: false,
        render: 'desktop',
        template: null,
        iframeUri: null,
        iframeTarget: 'page',
        newField: {name:"",label:"",required:false}
      };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSchemaInputChange = this.handleSchemaInputChange.bind(this);
    this.ajaxUpdate = this.debounce(this.ajaxUpdate, 1000, false);
    this.ajaxUpdateSchema = this.debounce(this.ajaxUpdateSchema, 1000, false);
    this.iframeStyle = this.iframeStyle.bind(this);
    this.viewDesktop = this.viewDesktop.bind(this);
    this.viewMobile = this.viewMobile.bind(this);
    this.constructSchema = this.constructSchema.bind(this);
    this.constructImages = this.constructImages.bind(this);
    this.constructFields = this.constructFields.bind(this);
    this.triggerIframeRefresh = this.triggerIframeRefresh.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleNewField = this.handleNewField.bind(this);
    this.updateApplication = this.updateApplication.bind(this);
  }

  debounce(a,b,c){
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g))
      }
      var f=this,g=arguments;
      clearTimeout(d);
      d=setTimeout(h,b);
      c&&!d&&(e=a.apply(f,g));
      return e;
    }
  }

  componentDidMount() {
    Service.getFacebookApplication(this.props.match.params.id)
    .catch(e => {
      this.setState({notFound: true});
    })
    .then(data => {
      if (data) {
        this.setState({application:data});
        this.triggerIframeRefresh();

        Service.getFacebookTemplate(this.state.application.template).then(data => this.setState({template:data}));
        Service.getCatchImages(this.state.application.id).then(data => this.setState({images:data}));
    } else {
      this.setState({notFound: true});
      this.props.history.push('new');
    }} );

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      name: value
    });

    this.ajaxUpdate(name);
  }

  ajaxUpdate(name) {
    Service.updateCatchApplication(this.state.application.id, this.state.application)
    .then(setTimeout(this.triggerIframeRefresh,1000));
  }

  uploadFile(files) {
    const file = files[0];
    Service.uploadCatchFile(this.state.application.id, file)
    .then(data => {
        this.setState({images:data});
      });
  }

  updateApplication(app) {
    console.log("Updating application: ", app);

    const application = this.state.application;

    application[app.name] = app.value;

    this.setState({application:application});

    this.ajaxUpdate(app.name);

    if (app.name === 'template') {
      this.setState({template:null});
      Service.getFacebookTemplate(app.value).then(data => this.setState({template:data}));
    }
  }

  handleSchemaInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked :
                  target.type === 'file' ? target.files[0] :
                  target.value;
    const name = target.name;


    const schemaValues = this.state.application.schemaValues;
    const application = this.state.application;
    schemaValues[name] = value;
    this.setState({
      application: application
    });

    this.ajaxUpdateSchema(name);
  }

  viewDesktop() {
    this.setState({render: 'desktop'})
  }

  viewMobile() {
    this.setState({render: 'mobile'});
  }

  ajaxUpdateSchema(name) {
    Service.updateCatchSchemaValues(this.state.application.id, this.state.application.schemaValues)
    .then(() => this.triggerIframeRefresh());
  }

  triggerIframeRefresh(target) {
    target = target || this.state.iframeTarget;
    this.setState({iframeTarget: target});
    this.setState({iframeUri:catchBase + this.state.application.uri + '/'+target+'?'+Math.random()});
  }

  iframeStyle() {
    if (this.state.render === 'desktop') {
      return {width: '100%', height: '90vh', transition: 'width 200ms, height 200ms'}
    } else if (this.state.render === 'mobile') {
      return {width: '380px', height: '700px', transition: 'width 200ms, height 200ms'}
    }
  }

  constructSchema() {
    return this.state.template == null ? (<p>Loading template schema</p>) : (
      <div>
        {this.state.template.fields.map((field,idx) => <Field key={idx} field={field} app={this}/>)}
      </div>
    )
  }

  constructImages() {
    return this.state.images == null ? (<p>Loading images</p>)
      : (
      <div>
        <b>Upload images here to make them available to the template</b>
        <div className="form-group">
          <label>Upload images</label>
          <input type="file" name="fileUpload" onChange={(e) => this.uploadFile(e.target.files)} />
        </div>
      </div>
    )
  }

  handleNewField(e) {
    const newField = this.state.newField;
    if (e.target.type === 'submit') {
      const application = this.state.application;
      const applicationFields = application.applicationFields;
      applicationFields.push({name:newField.name, label:newField.label, required: newField.required});
      this.setState({application: application});
      Service.updateApplicationFields(this.state.application.id, this.state.application.applicationFields);
      newField.name = "";
      newField.label = "";
      newField.required = false;
      this.setState({newField: newField});
      return;

    } else if (e.target.type === 'checkbox') {
      newField.required = e.target.checked;
    } else if (e.target.name === 'label') {
      newField.label = e.target.value;
      newField.name = newField.label.toLowerCase().replace(/[^a-zA-Z0-9_-]/,'_');
    }

    this.setState({newField: newField});
  }

  constructFields() {

    const newField = this.state.newField;

    const columns = [{
      Header: 'name',
      accessor: 'name'
    }, {
      Header: 'Label',
      accessor: 'label'
    }, {
      Header: 'Required',
      accessor: 'required',
      Cell: props => props.value ? "required" : "optional"
    }];

    return this.state.application.applicationFields == null ? (<p>Loading fields</p>)
      : (
        <div>
        <ReactTable
          data={this.state.application.applicationFields}
          columns={columns}
          showPagination={false}
          minRows={1}
        />
      <div className="form-row">
        <div className="col-auto">
          <input type="text" name="label" placeholder="Label" value={newField.label} onChange={this.handleNewField}/>
        </div>
        <div className="col-auto">
          <input type="text" name="name" placeholder="Name" value={newField.name} onChange={this.handleNewField}/>
        </div>
        <div className="col-auto">
          Required: <input type="checkbox" name="required"  checked={newField.required} onChange={this.handleNewField}/>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={this.handleNewField}>Create</button>
        </div>
      </div>
    </div>
    )
  }

  render() {

    const schema = this.constructSchema();

    const images = this.constructImages();

    const fields = this.constructFields();

    const status = (()=>{
         switch(this.state.application.status) {
               case 'DEVELOPMENT': return (<div>Currently in development. <button className="btn btn-primary">Go live</button></div>);
               case 'LIVE': return (<div>App is live.  You cannot make changes. <button className="btn btn-primary">Archive</button></div>);
               case 'ARCHIVE': return (<div>Archived app. <button className="btn btn-primary">Duplicate</button></div>);
               default:
                return null;
             }
    })();

    const editApp = this.state.application.status === 'DEVELOPMENT' ? (<BootstrapCard initial={false} heading={"Customise look"} body={schema}/>) : null;

    const uploadImages = this.state.application.status === 'DEVELOPMENT' ? (<BootstrapCard initial={false} heading="Upload images" body={images}/>) : null;

    const modifyFields = this.state.application.status === 'DEVELOPMENT' ? (<BootstrapCard initial={false} heading="Collect additional information" body={fields} />) : null;

      return (
      <div className="container-fluid h-100">
      <div id="catchEditColumn" className="row h-100">
        <div className="col-lg-12">
          <BootstrapCard heading="Status" body={status} />
          <CatchAppDetails app={this.state.application} change={this.updateApplication}/>
          {editApp}
          {uploadImages}
          {modifyFields}
        </div>
      </div>
      <div id="catchPreviewColumn">
        <div className="h-100">
          <div className="navestylemenublock sticky-top">
            <div>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <i onClick={this.viewDesktop} className="fa fa-desktop fa-2x" aria-hidden="true" style={{cursor:"pointer"}}></i> <i style={{cursor:"pointer"}} className="fa fa-mobile fa-2x" aria-hidden="true" onClick={this.viewMobile}></i>
              </li>
              <li className="nav-item">&nbsp;</li>
              <li className="nav-item">
                <a tabIndex="1" style={{cursor:'pointer'}} className={this.state.iframeTarget === 'page' ? "nav-link active" : "nav-link"} onClick={e => this.triggerIframeRefresh('page')}>Application</a>
              </li>
              <li className="nav-item">
                <a tabIndex="1" style={{cursor:'pointer'}} className={this.state.iframeTarget === 'terms' ? "nav-link active" : "nav-link"} onClick={e => this.triggerIframeRefresh('terms')}>Terms</a>
              </li>
              <li className="nav-item">
                <a tabIndex="1" style={{cursor:'pointer'}} className={this.state.iframeTarget === 'thanks' ? "nav-link active" : "nav-link"} onClick={e => this.triggerIframeRefresh('thanks')}>Thanks page</a>
              </li>
            </ul>
            </div>
            <div className="resizer">
              <iframe title="previewIframe" ref={(f) => this.iframe = f } src={this.state.iframeUri} style={this.iframeStyle()}/>
            </div>


          </div>

        </div>

      </div>
      </div>

  )
}


}

const Field = ({field, app}) => {
  if (field.type === 'Text' && field.multiline) {
    return (
      <div className="form-group">
        <label>{field.label}</label> <textarea name={field.name} type="text" className="form-control" onChange={app.handleSchemaInputChange} value={app.state.application.schemaValues[field.name]}/>
      </div>
    );

  } else if (field.type === 'Text' ) {
    return (
      <div className="form-group">
        <label>{field.label}</label> <input name={field.name} type="text" className="form-control" onChange={app.handleSchemaInputChange} value={app.state.application.schemaValues[field.name]}/>
      </div>
    );
  } else if (field.type === 'Image') {
    if (app.state.images == null) {
      return (<p><label>{field.label}</label> Loading images</p>);
    }
    if (app.state.images.length === 0) {
      return (<p><label>{field.label}</label> First upload an image before you can select one</p>)
    }
    return (
    <div className="form-group">
      <label>{field.label}</label>
      <select name={field.name} onChange={app.handleSchemaInputChange} value={app.state.application.schemaValues[field.name]}>
        <option value={null}>Select an image</option>
        {app.state.images.map((image, index) => (<option key={index} value={image}>{image}</option>))}

      </select>
    </div>
    )
  } else if (field.type === 'Boolean') {
    let checked = app.state.application.schemaValues[field.name];
    if (checked === 'false') {
      checked = false;
    }
    return (
      <div className="form-check">
        <input id={"field_"+field.name} name={field.name} type="checkbox" className="form-check-input" onChange={app.handleSchemaInputChange} checked={checked}/>
        <label htmlFor={"field_"+field.name}>{field.label}</label>
      </div>
    );
  }
}


export default FacebookApplication;
