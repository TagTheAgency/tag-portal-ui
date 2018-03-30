import React, { Component } from 'react';
import './PitchPageImage.css';

class PitchPageImage extends Component {
  constructor(props) {
    super(props);
    console.log("Pitch page image props", props);
    // this.state = {
    //   id: props.image.id,
    //   pageId: props.image.pageId,
    //   pitchId: props.pitchId,
    //   filename: props.image.filename,
    //   x: props.image.x,
    //   y: props.image.y,
    //   w: props.image.w,
    //   h: props.image.h
    // };
    console.log('CSJM', props);
    console.log('state', this.state);

    this.ratio = this.props.image.w / this.props.image.h;

    this.handleInputChange = this.handleInputChange.bind(this);
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
    const filename = "http://localhost:82/tagportal/" + this.props.pitch + "/" + this.props.image.pageId + "/files/" + this.props.image.filename;
    const id = this.props.image.id;
    return (
    <div className="form-row image-editor" data-filename={this.props.image.filename} data-page={this.props.image.pageId} data-image-id={this.props.image.id} data-aspect-ratio={this.props.image.w / this.props.image.h}>
			<div className="col-md-3"><img className="preview" src={filename} /></div>
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
		      <button className="btn btn-primary imageUpdater">Update image</button>
		    </div>
			<div className="form-group col-md-2">
			  <label style={{color:"white"}}>Remove image</label>
		      <button className="btn btn-danger imageDeleter" data-image-id="${image.id }" data-page-id="${page.id }">Remove image</button>
		    </div>
		</div>
    )
  }
};


export default PitchPageImage;
