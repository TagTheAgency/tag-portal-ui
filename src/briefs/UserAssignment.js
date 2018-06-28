import React, { Component } from 'react';

class UserAssignment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-group-item">{this.props.user.user.name}</li>
    )
  }
}

export default UserAssignment;
