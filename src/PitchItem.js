import React, { Component } from 'react';
import PitchPage from './PitchPage.js';

class PitchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      title: '',
      pages: [{id:1}, {id:2}]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPage = this.addPage.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addPage(event) {
    console.log(this);
    this.setState(prevState => ({
      pages: [...prevState.pages, {id:3}]
    }));
  }

  render() {
    return (
      <div>
      <div>
        <div className="form-group">
          <label htmlFor="pitchName">Pitch title (or client name)</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Enter pitch title" className="form-control"/>
          <div className="invalid-feedback">
            Please provide a valid pitch title.
          </div>
        </div>
        <p>A pitch, I wonder which. {this.props.match.params.id}</p>
      </div>
      <div className="container-fluid">
        <div className="row">
	         <div className="col-12">
             {this.state.pages.map(page => <PitchPage page={page}/>)}
           </div>
        </div>
        <button onClick={this.addPage}>Add Page</button>
      </div>
      </div>

    )
  }
};


export default PitchItem;
