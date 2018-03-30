import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import PitchPageImage from './PitchPageImage.js';
import ImageOverlay from './ImageOverlay.js';
import './PitchPage.css';

const PageTypes = [
  "STANDARD", "RATE_CARD", "CREATIVE_PROCESS", "TS_AND_CS"
];

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
      images: props.page.images
    };
    console.log('CSJM', props);
    console.log('state', this.state);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleImageManualChange = this.handleImageManualChange.bind(this);
    this.handleImageDragChange = this.handleImageDragChange.bind(this);
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
  }

  render() {
    const pdfLink = 'http://localhost:82/tagportal/' + this.state.pitchId + '/' + 'preview.pdf';
    if (this.state.pitchId < 0) {
      return (<div></div>)
    }
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
                      {PageTypes.map((type, index) => (<option key={index} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pageTitle{this.state.id}">Page title</label> <input name="title" type="text" className="form-control pageTitle" id="pageTitle{this.state.id}" placeholder="Enter page title" required="" onChange={this.handleInputChange} value={this.state.title }/>
                    <div className="invalid-feedback">Please provide a valid title for this page.</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Page content</label>
                    <textarea className="form-control pageContent" id="content{this.state.id}" rows="10" value={this.state.text} onChange={this.handleInputChange}></textarea>
                  </div>
                  <div className="dropzone">
                    <div className="files" id="files{this.state.id}" data-page-id="{this.state.id}"></div>
                      <div className="previewsContainer dropzone-previews" id="previewsContainer{this.state.id}"></div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7" style={{position:'relative'}}>
                  <PDF
                    file={pdfLink}
                    onDocumentComplete={this.onDocumentComplete}
                    onPageComplete={this.onPageComplete}
                    page={this.state.order + 2}
                    scale={0.8}
                  />
                {this.state.images.map(image => (<PitchPageImage key={image.id} pitch={this.props.pitch} image={image} onChange={this.handleImageManualChange}/>))}
                <div className="fileOverlay" onDragOver={(e)=>{e.preventDefault();return false;}} onDrop={(e)=>{e.preventDefault();return false;}}>
                  {this.state.images.map(image => (<ImageOverlay key={image.id} pitch={this.props.pitch} image={image} onMove={this.handleImageManualChange} onChange={this.handleImageDragChange}/>))}
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>

    )
  }
};


export default PitchPage;
