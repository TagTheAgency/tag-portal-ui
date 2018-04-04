import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PDF from 'react-pdf-js';
import PitchPageImage from './PitchPageImage.js';
import ImageOverlay from './ImageOverlay.js';
import Service from './components/Service.js';
import './PitchPage.css';

// const PageTypes = [
//   "STANDARD", "RATE_CARD", "CREATIVE_PROCESS", "TS_AND_CS"
// ];

class PitchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.page.id,
      pitchId: props.pitch,
      title: props.page.title == null ? '' : props.page.title,
      implementation: props.page.implementation,
      text: props.page.text == null ? '' : props.page.text,
      order: props.page.order,
      images: props.page.images,
      pdfLink: 'http://localhost:82/tagportal/pitch/' + props.pitch + '/preview.pdf'
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleImageManualChange = this.handleImageManualChange.bind(this);
    this.handleImageDragChange = this.handleImageDragChange.bind(this);

    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.triggerPdfRefresh = this.triggerPdfRefresh.bind(this);

    this.deleteImage = this.deleteImage.bind(this);

    this.ajaxUpdate = this.debounce(this.ajaxUpdate, 1000, false);
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

  deleteImage(image) {
    const images = this.state.images;

    const filtered = images.filter(el => el.id !== image.props.image.id);

    this.setState({images: filtered});
    this.triggerPdfRefresh();
  }

  triggerPdfRefresh() {
    this.forceUpdate();
    this.setState({'pdfLink':'http://localhost:82/tagportal/pitch/' + this.state.pitchId + '/preview.pdf?'+Math.random()});
  }

  handleFileDrop(accepted, rejected) {
    accepted.forEach(file => {
      Service.uploadFile(this.state.pitchId, this.state.id, file)
      .then(data => {
        if (data.id) {
          const images = this.state.images;
          images.push(data);
          this.setState({images:images});
          this.triggerPdfRefresh();
        }
      });
    });

  }

  handleImageManualChange(image) {
    const dimension = image.dimension;
    const imageId = image.id;
    const value = image.value;

    const images = this.state.images;
    const editedImage = images.find(el => el.id === imageId);
    editedImage[dimension] = value;
    this.setState({images: images});
  }

  handleImageDragChange(image) {
    const dimension = image.dimension;
    const imageId = image.id;

    const images = this.state.images;
    const editedImage = images.find(el => el.id === imageId);
    editedImage.w = dimension.width;
    editedImage.h = dimension.height;
    this.setState({images: images});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.ajaxUpdate(name);
  }

  ajaxUpdate(name) {
    Service.updatePage(this.state.pitchId, this.state.id, name, this.state)
    .then(this.triggerPdfRefresh);
  }


  render() {
    if (this.state.pitchId < 0 || typeof(this.props.pitchPageTypes) === 'undefined') {
      return (<div></div>)
    }

    const showDetails = this.state.implementation === 'com.tagtheagency.portal.pitch.pages.TextAndImagePage';
    const bodyText = showDetails ?
    (
      <div className="form-group">
        <label htmlFor={"content" + this.state.id}>Page content</label>
        <textarea className="form-control pageContent" id={"content" + this.state.id} name="text" rows="10" value={this.state.text} onChange={this.handleInputChange}></textarea>
      </div>
    ) : ( null)

    const stateImages = this.state.images;
    const props = this.props;
    const handleImageManualChange = this.handleImageManualChange;
    const triggerPdfRefresh = this.triggerPdfRefresh;
    const handleFileDrop = this.handleFileDrop;
    const handleImageDragChange = this.handleImageDragChange;
    const deleteImage = this.deleteImage;

    const apiKey = {'token': 'Bearer '+localStorage.id_token};
    const httpHeaders = {'httpHeaders' : apiKey, 'url': this.state.pdfLink};

    const images = showDetails ?
    (
      <div>
        {stateImages.map(image => (<PitchPageImage key={image.id} pitch={props.pitch} image={image} onChange={handleImageManualChange} triggerPdfRefresh={triggerPdfRefresh} remove={deleteImage}/>))}
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={handleFileDrop}
          style={{width: '100%', height: '100px', 'borderWidth': '2px', 'borderColor': 'rgb(102, 102, 102)', 'borderStyle': 'dashed', 'borderRadius': '5px'}}
        >
          <p>Drop an image file (*.jpeg, *.png) here to add it to the page.</p>
        </Dropzone>

        <div className="fileOverlay" onDragOver={(e)=>{e.preventDefault();return false;}} onDrop={(e)=>{e.preventDefault();return false;}}>
          {stateImages.map(image => (<ImageOverlay key={image.id} pitch={props.pitch} image={image} onMove={handleImageManualChange} onChange={handleImageDragChange}/>))}
        </div>
      </div>
    ) : (null)

    return (

      <div data-row-id={this.state.id} data-page-order={this.state.order} className="pageTemplate">
				<div className="card">
					<div className="card-header" role="tab" id="templateHeading{this.state.id}">
						<h5 className="mb-0">
							<i className="fa fa-arrows" aria-hidden="true"></i>
							<a data-toggle="collapse" href="#collapse{this.state.id}" aria-expanded="true" aria-controls="collapse{this.state.id}"  className=""><i className="fa fa-expand" aria-hidden="true" style={{float:'right'}}></i><span id="headingLink{this.state.id}">{this.state.title }</span> </a>
						</h5>
					</div>

          <div id="collapse{this.state.id}" className="collapse show" role="tabpanel" aria-labelledby="templateHeading{this.state.id}" data-parent="#accordion">
            <div className="row">
              <div className="col-lg-5">
                <div className="card-body" id="originCard{this.state.id}">
                  <div className="form-group">
                    <label htmlFor="type">Page type</label>

                    <select value={this.state.implementation} onChange={this.handleInputChange} name="implementation">
                      {this.props.pitchPageTypes.map((type, index) => (<option key={index} value={type.implementationClazz}>{type.description}</option>))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pageTitle{this.state.id}">Page title</label> <input name="title" type="text" className="form-control pageTitle" id="pageTitle{this.state.id}" placeholder="Enter page title" required="" onChange={this.handleInputChange} value={this.state.title }/>
                    <div className="invalid-feedback">Please provide a valid title for this page.</div>
                  </div>
                  {bodyText}
                  </div>
                </div>
                <div className="col-lg-7" style={{position:'relative'}}>
                  <PDF
                    onDocumentComplete={this.onDocumentComplete}
                    onPageComplete={this.onPageComplete}
                    page={this.state.order + 2}
                    scale={0.8}
                    documentInitParameters={httpHeaders}
                  />

                {images}
                </div>

              </div>
            </div>
          </div>
        </div>

    )
  }
};


export default PitchPage;
