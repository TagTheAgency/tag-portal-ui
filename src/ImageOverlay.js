import React, { Component } from 'react';

import './ImageOverlay.css';

class ImageOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetX: 0, offsetY: 0, offsetW: 0, throttle: false, move: "move"
    }

    this.handleResize = this.handleResize.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
    this.resizeStart = this.resizeStart.bind(this);
    this.resize = this.resize.bind(this);
    this.resizeStop = this.resizeStop.bind(this);
  }

  resize = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newW = (event.clientX - this.state.offsetW);// - (this.props.image.x / 2 * 1.6));
//    const newH = (this.state.offsetY - event.clientY);

    if (!this.state.throttle) {
      this.setState({throttle: true});

      const adjustedW = newW / 0.8;//;+ (this.props.image.w / 2 * 1.6);

      this.props.onMove({id: this.props.image.id, dimension: 'w', value: adjustedW});
      setTimeout(()=>{this.setState({throttle: false});}, 1000);
    }



  }

  resizeStart = (event) => {
    this.setState({move: "resize"});
    //event.preventDefault();
    //event.stopPropagation();
    this.setState({offsetW: event.clientX + /*(this.props.image.w / 2 * 1.6)+*/ (this.props.image.w / 2 * 1.6)});
    this.setState({offsetY: event.clientY + (this.props.image.y / 2 * 1.6)});

    event.dataTransfer.dropEffect = "move";
  }

  resizeStop = (event) => {
    this.setState({move: "move"});
  }

  handleResize = (event) => {
    console.log(event);
//    this.props.onChange({id: this.props.image.id, dimension: size});

  }
  drag = (event) => {
    if (this.state.move === 'resize') {
      return;
    }

    const newX = (event.clientX - this.state.offsetX);
    const newY = (this.state.offsetY - event.clientY);
    if (newX === this.props.image.x / 0.8 && newY === this.props.image.y / 0.8) {
      return;
    }
    const adjustedX = newX / 0.8;
    const adjustedY = newY / 0.8;

    if (!this.state.throttle) {
      this.setState({throttle: true});

      this.props.onMove({id: this.props.image.id, dimension: 'x', value: adjustedX});
      this.props.onMove({id: this.props.image.id, dimension: 'y', value: adjustedY});
      setTimeout(()=>{this.setState({throttle: false});}, 100);
    }
  }

  dragStart = (event) => {
    this.setState({offsetX: event.clientX - (this.props.image.x / 2 * 1.6)});
    this.setState({offsetY: event.clientY + (this.props.image.y / 2 * 1.6)});

    event.dataTransfer.dropEffect = "move";
  }

   calcBottomFromTop(top, height, container) {
  	return container - height - top;
  }

  render() {
    const id = "wireframe"+this.props.image.id;
    const w = this.props.image.w / 2 * 1.6;
    const h = this.props.image.h / 2 * 1.6;
    const x = this.props.image.x / 2 * 1.6;
    const y = this.props.image.y / 2 * 1.6;//this.calcBottomFromTop(this.props.image.y / 2 * 1.6, h, 476);

    // <ResizableBox width={w} height={h} onResize={this.handleResize} lockAspectRatio={true}>
    return (
      <div>
        <div className="wireframe" onDrag={this.drag} draggable="true" onDragStart={this.dragStart} id={id} style={{width:w+'px', height: h+'px', left: x+'px', bottom: y+'px'}}>
          <div className="resizable-handle" onDrag={this.resize} draggable="true" onDragStart={this.resizeStart} onDragEnd={this.resizeStop}/>
        </div>
      </div>
    )
  }
};


export default ImageOverlay;
