import React, { Component } from 'react';
import Service from './components/Service.js';
import ReactTable from 'react-table';
import './PitchPage.css';

const catchBase = process.env.REACT_APP_CATCH_ENDPOINT + '/app/';


class FacebookApplication extends Component {

  constructor(props) {

    super(props);

    this.state = {
        id: -1,
        uri: '',
        name: '',
        notFound: false,
        render: 'desktop',
        template: null,
        iframeUri: null,
        section: 'template'
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
    this.show = this.show.bind(this);
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
        this.setState(data);
        this.triggerIframeRefresh();
        Service.getFacebookTemplate(this.state.template).then(data => this.setState({template:data}));
        Service.getCatchImages(this.state.id).then(data => this.setState({images:data}));
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

  uploadFile(files) {
    const file = files[0];
    Service.uploadCatchFile(this.state.id, file)
    .then(data => {
        this.setState({images:data});
      });
  }

  show(which) {
    this.setState({section:which});
  }


  handleSchemaInputChange(event) {
    const target = event.target;
    const value = target.type === 'file' ? target.files[0] : target.value;
    const name = target.name;

    const schemaValues = this.state.schemaValues;
    schemaValues[name] = value;
    this.setState({
      schemaValues: schemaValues
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
    console.log(this.state.id)
    Service.updateCatchSchemaValues(this.state.id, this.state.schemaValues)
    .then(this.triggerIframeRefresh);
  }

  triggerIframeRefresh() {
    this.setState({iframeUri:catchBase + this.state.uri + '/page?'+Math.random()});
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
        <div className="form-group">
          <label>Upload images</label>
          <input type="file" name="fileUpload" onChange={(e) => this.uploadFile(e.target.files)} />
        </div>
      </div>
    )
  }

  constructFields() {

    const columns = [{
      Header: 'name',
      accessor: 'name'
    }, {
      Header: 'Label',
      accessor: 'label'
    }, {
      Header: 'Required',
      accessor: 'required'
    }];

    return this.state.applicationFields == null ? (<p>Loading fields</p>)
      : (
        <div>
        <ReactTable
          data={this.state.applicationFields}
          columns={columns}
          showPagination={false}
          minRows={1}
        />
          <div className="form-group">
            <label>New field</label>
            <input type="text" name="additionalField" />
          </div>
        </div>
    )
  }

  render() {

    const schema = this.state.section === 'template' ? this.constructSchema() : null;

    const images = this.state.section === 'images' ? this.constructImages() : null;

    const fields = this.state.section === 'fields' ? this.constructFields() : null;

    const status = (()=>{
         switch(this.state.status) {
               case 'DEVELOPMENT': return (<div>Currently in development. <button className="btn btn-primary">Go live</button></div>);
               case 'LIVE': return (<div>App is live.  You cannot make changes. <button className="btn btn-primary">Archive</button></div>);
               case 'ARCHIVE': return (<div>Archived app. <button className="btn btn-primary">Duplicate</button></div>);
               default:
                return null;
             }
    })();

    const editApp = this.state.status === 'DEVELOPMENT' ? (
      <div className="card mb-3">
        <div className="card-header">
          Edit application
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a style={{cursor:'pointer'}} className={this.state.section === 'template' ? "nav-link active" : "nav-link"} onClick={() => this.show('template')}>Edit template</a>
            </li>
            <li className="nav-item">
              <a style={{cursor:'pointer'}} className={this.state.section === 'images' ? "nav-link active" : "nav-link"} onClick={() => this.show('images')}>Upload images</a>
            </li>
            <li className="nav-item">
              <a style={{cursor:'pointer'}} className={this.state.section === 'fields' ? "nav-link active" : "nav-link"} onClick={() => this.show('fields')}>Add fields</a>
            </li>
          </ul>
          {schema}
          {images}
          {fields}
        </div>
      </div>
    ) : null;

      return (
      <div className="row">
        <div className="col-lg-5">
          <div className="card mb-3">
            <div className="card-header">
              Status
            </div>
            <div className="card-body">
              {status}
            </div>
          </div>
          {editApp}
        </div>
        <div className="col-lg-7">
          <div><i onClick={this.viewDesktop} className="fa fa-desktop fa-2x" aria-hidden="true" style={{cursor:"pointer"}}></i> <i style={{cursor:"pointer"}} className="fa fa-mobile fa-2x" aria-hidden="true" onClick={this.viewMobile}></i> </div>
          <div className="resizer">
            <iframe title="previewIframe" ref={(f) => this.iframe = f } src={this.state.iframeUri} style={this.iframeStyle()}/>
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
        <label>{field.label}</label> <textarea name={field.name} type="text" className="form-control" onChange={app.handleSchemaInputChange} value={app.state.schemaValues[field.name]}/>
      </div>
    );

  } else if (field.type === 'Text' ) {
    return (
      <div className="form-group">
        <label>{field.label}</label> <input name={field.name} type="text" className="form-control" onChange={app.handleSchemaInputChange} value={app.state.schemaValues[field.name]}/>
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
      <select name={field.name} onChange={app.handleSchemaInputChange} value={app.state.schemaValues[field.name]}>
        <option value={null}>Select an image</option>
        {app.state.images.map((image, index) => (<option key={index} value={image}>{image}</option>))}

      </select>
    </div>
    )
  }
}


export default FacebookApplication;
