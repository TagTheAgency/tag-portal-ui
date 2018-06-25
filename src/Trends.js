import React, { Component } from 'react';
import Service from './components/Service.js';

class Trends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "youtube":[]
    }

  }

  componentDidMount() {
    Service.getYoutubeTrends()
      .then(data => this.setState({"youtube":data}));
  }


  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
        <h1>Currently trending in NZ</h1>
          {this.state.youtube.map(el=><img alt={el.snippet.title} src={el.snippet.thumbnails.default.url}/>)}

        <h1>Currently trending in Aus</h1>
        <p>TODO</p>
      </div>
      </div>
    )

  }
}


export default Trends;
