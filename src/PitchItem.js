import React, { Component } from 'react';
import PitchPage from './PitchPage.js';
import { Redirect } from 'react-router-dom';
import BreadCrumbs from "./components/BreadCrumbs.js";

class PitchItem extends Component {



  constructor(props) {

    super(props);

    this.state = {
        id: -1,
        title: '',
        createdDate: 0,
        modifiedDate: 0,
        createdUser: '',
        modifiedUser: '',
        pages: [{id:1}, {id:2}],
        notFound: false
      };


    console.log("CSJM pitch item props",props);

//    this.setState({'id': props.match.params.id});

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPage = this.addPage.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:82/tagportal/'+this.props.match.params.id)
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          this.setState({notFound: true});
        }
      })
      .then(data =>
         { if (data) this.setState(data) } );

    fetch('http://localhost:82/tagportal/pageTypes')
    .then(response => response.json())
    .then(data => this.setState({"pageTypes":data}));
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
    const { notFound } = this.state;
    if (notFound) {
      return <Redirect to='/pitch'/>;
    }
    const pitchRoot = `${process.env.PUBLIC_URL}/pitch`;
    return (
      <div>
        <BreadCrumbs elements={[{"link":pitchRoot, "name":"Pitches"},{"link":pitchRoot+'/'+this.state.id, "name":this.state.title}]} />
        <div>
          <div className="container-fluid">

            <div className="form-group">
              <label htmlFor="pitchName">Pitch title (or client name)</label>
              <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Enter pitch title" className="form-control"/>
              <div className="invalid-feedback">
                Please provide a valid pitch title.
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {this.state.pages.map(page => <PitchPage key={page.id} page={page} pitch={this.state.id} pitchPageTypes={this.state.pageTypes}/>)}
             </div>
           </div>
           <button onClick={this.addPage}>Add Page</button>
         </div>
      </div>
    </div>

    )
  }
};


export default PitchItem;
