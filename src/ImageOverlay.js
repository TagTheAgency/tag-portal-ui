import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';

import './ImageOverlay.css';

class ImageOverlay extends Component {
  constructor(props) {
    super(props);
    console.log("image overlay props", props);
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

    this.state = {
      offsetX: 0, offsetY: 0, throttle: false
    }

    this.handleResize = this.handleResize.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
  }

  handleResize = (event, {element, size}) => {
    this.props.onChange({id: this.props.image.id, dimension: size});

  }
  drag = (event) => {

    const newX = (event.clientX - this.state.offsetX);
    const newY = (event.clientY - this.state.offsetY);
    if (newX === this.props.image.x / 0.8 && newY === this.props.image.y / 0.8) {
      console.log('same, noop');
      return;
    }
    // console.log('DragX:'+this.state.offsetX + event.clientX+", props x: "+this.props.image.x);
    //
    // console.log(newX, this.props.image.x);
    const adjustedX = newX / 0.8;
    const adjustedY = newY / 0.8 ;


    if (!this.state.throttle) {
      this.setState({throttle: true});

      console.log("Mouse X: "+event.clientX );
      console.log("OffsetX: "+this.state.offsetX);
      console.log("ScreenX: "+newX);
      console.log("Props X: "+adjustedX);

      this.props.onMove({id: this.props.image.id, dimension: 'x', value: adjustedX});
      this.props.onMove({id: this.props.image.id, dimension: 'y', value: adjustedY});
      setTimeout(()=>{this.setState({throttle: false});}, 100);
    }
  }

  dragStart = (event) => {
    this.setState({offsetX: event.clientX - (this.props.image.x / 2 * 1.6)});
    this.setState({offsetY: event.clientY - (this.props.image.y / 2 * 1.6)});
    console.log("Event.clientX", event.clientX);
    console.log('drag start, offset ',event.clientX - (this.props.image.x / 2 * 1.6));
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
    const y = this.calcBottomFromTop(this.props.image.y / 2 * 1.6, h, 476);

    // <ResizableBox width={w} height={h} onResize={this.handleResize} lockAspectRatio={true}>
    return (
      <div>
      <div className="wireframe" onDrag={this.drag} draggable="true" onDragStart={this.dragStart} id={id} style={{width:w+'px', height: h+'px', left: x+'px', top: y+'px'}}></div>
      <div draggable="true" onDragStart={this.dragStart}>Kittens have fur</div>
      </div>
    )
  }
};


export default ImageOverlay;
