import React, { Component } from 'react';


const PageTypes = [
  "STANDARD", "RATE_CARD", "CREATIVE_PROCESS", "TS_AND_CS"
];

class PitchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.page.id,
      pitchId: -1,
      title: props.page.title == null ? '' : props.page.title,
      implementation: props.page.implementation,
      text: props.page.text == null ? '' : props.page.text,
      order: props.page.order
    };
    console.log('CSJM', props);
    console.log('state', this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (

      <div data-row-id={this.state.id} data-page-order={this.state.order} className="pageTemplate">
				<div className="card">
					<div className="card-header" role="tab" id="templateHeading{this.state.id}">
						<h5 className="mb-0">
							<i className="fa fa-arrows" aria-hidden="true"></i>
							<a data-toggle="collapse" href="#collapse{this.state.id}" aria-expanded="true" aria-controls="collapse{this.state.id}"  className=""><i className="fa fa-expand" aria-hidden="true" style={{float:'right'}}></i><span id="headingLink{this.state.id}">{this.state.title }</span> </a>
						</h5>
					</div>

          <div id="collapse{this.state.id}" className="collapse show" role="tabpanel" aria-labelledby="templateHeading{this.state.id}" data-parent="#accordion">
            <div className="row">
              <div className="col-lg-5">
                <div className="card-body" id="originCard{this.state.id}">
                  <div className="form-group">
                    <label htmlFor="type">Page type</label>

                    <select value={this.state.implementation} onChange={this.handleInputChange} name="implementation">
                      {PageTypes.map((type, index) => (<option key={index} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pageTitle{this.state.id}">Page title</label> <input name="title" type="text" className="form-control pageTitle" id="pageTitle{this.state.id}" placeholder="Enter page title" required="" onChange={this.handleInputChange} value={this.state.title }/>
                    <div className="invalid-feedback">Please provide a valid title for this page.</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Page content</label>
                    <textarea className="form-control pageContent" id="content{this.state.id}" rows="10" value={this.state.text} onChange={this.handleInputChange}></textarea>
                  </div>
                  <div className="dropzone">
                    <div className="files" id="files{this.state.id}" data-page-id="{this.state.id}"></div>
                      <div className="previewsContainer dropzone-previews" id="previewsContainer{this.state.id}"></div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7" style={{position:'relative'}}>
                  <canvas id="the-canvas{this.state.id}"></canvas>
                </div>

              </div>
            </div>
          </div>
        </div>

    )
  }
};


export default PitchPage;
