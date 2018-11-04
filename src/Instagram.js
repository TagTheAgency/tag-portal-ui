import React, { Component } from 'react';
import Service from './components/Service.js';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
import {
      PopupboxManager,
      PopupboxContainer
    } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css";
import "./Instagram.css";

const formatStatus = (status) => {
  if (status === 'UNREVIEWED') {
    return (<div className="alert alert-info">Unreviewed</div>);
  } else if (status === 'APPROVED') {
    return (<div className="alert alert-success">Approved</div>);
  } else {
    return (<div className="alert alert-danger">Declined</div>);
  }
}

const createButtons = (value, approve, decline) => {
  return [
    <button key={"approve"+value.id} type="button" className="btn btn-success" onClick={() => {approve(value)}}>Approve</button>,
    <button key={"decline"+value.id} type="button" className="btn btn-danger" onClick={() => {decline(value)}}>Decline</button>
  ]
}



const columns = (approve, decline, popup) => {
  return [{
    Header: 'Preview',
    accessor: 'img', // String-based value accessors!
    Cell: props => {return (<img onClick={() => {popup(props.original.img,props.original.url)}} src={props.original.img} style={{width:"100px",height:"100px"}} />)}
  }, {
    Header: 'Link',
    accessor: 'url'
  }, {
    Header: 'Currently',
    maxWidth: 150,
    accessor: 'status',
    Cell: props => formatStatus(props.original.status)
  }, {
    Header: 'Approve',
    maxWidth: 250,
    accessor: 'status',
    Cell: props => createButtons(props.original, approve, decline)
  }

  ];
}

class Instagram extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.approveEntry = this.approveEntry.bind(this);
    this.declineEntry = this.declineEntry.bind(this);
    this.openPopupbox = this.openPopupbox.bind(this);

  }

  componentDidMount() {
    Service.getInstagramFeed('melbournecup').then(
      data => this.setState({"data":data})
    );
  }

  approveEntry(value) {
    Service.reviewInstagram('melbournecup', value.id, 'APPROVED').then(data => {
      let arr = this.state.data;
      let index = arr.findIndex((obj => obj.id == value.id));
      arr[index].status ="APPROVED";
      this.setState({data: arr});

    })
  }

  declineEntry(value) {
    Service.reviewInstagram('melbournecup', value.id, 'DECLINED').then(data => {
      let arr = this.state.data;
      let index = arr.findIndex((obj => obj.id == value.id));
      arr[index].status ="DECLINED";
      this.setState({data: arr});
    });
  }

  openPopupbox(img, url) {
    console.log("opening a popupbox with", img);
    const content = (<img src={img} />);
    PopupboxManager.open({
      content
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
        <h2>Melbourne Cup Feed</h2>
        <PopupboxContainer />
        <ReactTable
          data={this.state.data}
          columns={columns(this.approveEntry, this.declineEntry, this.openPopupbox)}
        />

        </div>
      </div>
    )

  }
}


export default Instagram;
