import React, { Component } from 'react';
import './PitchPageImage.css';

class PitchPageImage extends Component {
  constructor(props) {
    super(props);

    this.ratio = this.props.image.w / this.props.image.h;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  removeImage(event) {
    const updateURL = 'http://localhost:82/tagportal/pitch/'+this.props.pitch+'/'+this.props.image.pageId+'/image/' + this.props.image.id;

    fetch(updateURL, {
      method: 'DELETE'
    }).then(response => {
      this.props.remove(this);
    });
  }

  updateImage(event) {
    const updateURL = 'http://localhost:82/tagportal/pitch/'+this.props.pitch+'/'+this.props.image.pageId+'/image';
    fetch(updateURL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.props.image)
    }).then(this.props.triggerPdfRefresh);
  }

  handleInputChange(event) {
    const which = event.target;

    this.props.onChange({id: this.props.image.id, dimension: which.dataset.dimension, value: which.value});
    if (which.dataset.dimension === 'w') {
      this.props.onChange({id: this.props.image.id, dimension: 'h', value: which.value / this.ratio});
    } else if (which.dataset.dimension === 'h') {
      this.props.onChange({id: this.props.image.id, dimension: 'w', value: this.ratio * which.value});
    }

  }

  render() {
    const filename = "http://localhost:82/tagportal/pitch/" + this.props.pitch + "/" + this.props.image.pageId + "/files/" + this.props.image.filename;
    const id = this.props.image.id;
    return (
    <div className="form-row image-editor" data-filename={this.props.image.filename} data-page={this.props.image.pageId} data-image-id={this.props.image.id} data-aspect-ratio={this.props.image.w / this.props.image.h}>
			<div className="col-md-3"><img className="preview" src={filename} alt="thumbnail"/></div>
			<div className="form-group col-md-1">
		      <label htmlFor={"imageW"+id } >Width</label>
		      <input type="text" data-dimension="w" className="image-control form-control aspectControlled" id={"imageW"+id } onChange={this.handleInputChange} value={this.props.image.w }/>
		    </div>
		    <div className="form-group col-md-1">
		      <label htmlFor={"imageH"+id } >Height</label>
		      <input id={"imageH"+id } type="text" data-dimension="h" className="image-control form-control aspectControlled" onChange={this.handleInputChange} value={this.props.image.h}/>
		    </div>
			<div className="form-group col-md-1">
		      <label htmlFor={"imageX"+id }>X</label>
		      <input id={"imageX"+id } type="text" className="form-control image-control " data-dimension="x" onChange={this.handleInputChange} value={this.props.image.x }/>
		    </div>
			<div className="form-group col-md-1">
		      <label htmlFor={"imageY"+id }>Y</label>
		      <input id={"imageY"+id } type="text" className="form-control image-control " data-dimension="y" onChange={this.handleInputChange} value={this.props.image.y }/>
		    </div>
			<div className="form-group col-md-2">
			  <label style={{color:"white"}}>Update image</label>
		      <button className="btn btn-primary imageUpdater" onClick={this.updateImage}>Update image</button>
		    </div>
			<div className="form-group col-md-2">
			  <label style={{color:"white"}}>Remove image</label>
		      <button className="btn btn-danger imageDeleter" onClick={this.removeImage}>Remove image</button>
		    </div>
		</div>
    )
  }
};


export default PitchPageImage;
