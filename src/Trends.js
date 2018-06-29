import React, { Component } from 'react';
import Service from './components/Service.js';
import ReactTooltip from 'react-tooltip';

class Trends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "youtube":{nz:[], aus:[]}
    }

  }

  componentDidMount() {
    const youtube = this.state.youtube;

    Service.getYoutubeTrends("NZ")
      .then(data => {youtube.nz = data; this.setState({"youtube":youtube})});
    Service.getYoutubeTrends("AU")
      .then(data => {youtube.aus = data; this.setState({"youtube":youtube})});
  }


  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
        <h1>Currently trending in NZ</h1>
          {this.state.youtube.nz.map(el=><VideoPreview imgSrc={el.snippet.thumbnails.default.url} title={el.snippet.title} id={el.id}/>)}

        <h1>Currently trending in Aus</h1>
          {this.state.youtube.aus.map(el=><img alt={el.snippet.title} src={el.snippet.thumbnails.default.url}/>)}
      </div>
      </div>
    )

  }
}

const VideoPreview = ({ imgSrc, title, id}) => (
  <span data-id={id}>
  <img alt={title} src={imgSrc} data-tip data-for={id}/>
  <ReactTooltip id={id}><span>{title}</span></ReactTooltip>
  </span>
);

export default Trends;
