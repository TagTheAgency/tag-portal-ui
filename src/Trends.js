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
          {this.state.youtube.nz.map(el=><VideoPreview imgSrc={el.snippet.thumbnails.default.url} title={el.snippet.title} id={el.id} statistics={el.statistics}/>)}

        <h1>Currently trending in Aus</h1>
          {this.state.youtube.aus.map(el=><img alt={el.snippet.title} src={el.snippet.thumbnails.default.url}/>)}
      </div>
      </div>
    )

  }
}

const nFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const VideoPreview = ({ imgSrc, title, id, statistics}) => (
  <span data-id={id}>
  <img alt={title} src={imgSrc} data-tip data-for={id}/>
  <ReactTooltip id={id}><span>{title}</span><br/><span>Views: {nFormatter(statistics.viewCount, 0)}; Likes: {nFormatter(statistics.likeCount,0)}</span></ReactTooltip>
  </span>
);

export default Trends;
