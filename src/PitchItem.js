import React, { Component } from 'react';
import PitchPage from './PitchPage.js';
import { Redirect } from 'react-router-dom';
import BreadCrumbs from "./components/BreadCrumbs.js";
import Service from "./components/Service.js";
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
        pages: [],
        notFound: false
      };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPage = this.addPage.bind(this);

    this.ajaxUpdate = this.debounce(this.ajaxUpdate, 1000, false);
  }

  debounce(a,b,c){
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g))
      }
      var f=this,g=arguments;
      clearTimeout(d);
      d=setTimeout(h,b);
      c&&!d&&(e=a.apply(f,g));
      return e;
    }
  }

  componentDidMount() {
    Service.getPitch(this.props.match.params.id)
    .catch(e => {
      this.setState({notFound: true});
    })
    .then(data => { if (data) this.setState(data) } );

    Service.getPageTypes()
    .then(data => this.setState({"pageTypes":data}));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.ajaxUpdate(name);
  }

  ajaxUpdate(name) {
    console.log(this.state.id)
    Service.updatePitch(this.state.id, this.state)
//    .then(this.triggerPdfRefresh);
  }

  addPage(event) {
    Service.addPage(this.state.id)
    .then(response => {
      console.log(this);
      this.setState(prevState => ({
        pages: [...prevState.pages, response]
      }));
    })

  }

  render() {
    const { notFound } = this.state;
    if (notFound) {
      return <Redirect to='/pitch'/>;
    }
    const pitchRoot = `${process.env.PUBLIC_URL}/pitch`;
    console.log("Rendering a total of "+this.state.pages.length+" pages");
    return (
      <div>
        <BreadCrumbs elements={[{"link":pitchRoot, "name":"Pitches"},{"link":pitchRoot+'/'+this.state.id, "name":this.state.title}]} />
        <div>
          <div className="container-fluid">
            <button className="btn btn-primary" onClick={this.addPage}>Add page</button>

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
           <button className="btn btn-primary" onClick={this.addPage}>Add Page</button>
         </div>
      </div>
    </div>

    )
  }
};


export default PitchItem;
