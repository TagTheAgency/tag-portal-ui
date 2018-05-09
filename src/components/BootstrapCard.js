import React, {Component} from 'react';

class BootstrapCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showing:props.initial == null ? true : props.initial
    };

    this.showHide = this.showHide.bind(this);
  }

  showHide() {
    this.setState({showing:!this.state.showing});
  }

  render() {

    const body = this.state.showing ? (<div className="card-body">{this.props.body}</div>) : null;

    const icon = this.state.showing ? "hide" : "show";

    return (
      <div className="card mb-3">
        <div className="card-header">
          <div className="float-right" ><button className="btn btn-outline-primary" onClick={this.showHide}>{icon}</button></div>
          <div className="float-left pt-2">
            {this.props.heading}
          </div>
        </div>
        {body}
      </div>
    )
  }

}

export default BootstrapCard;
