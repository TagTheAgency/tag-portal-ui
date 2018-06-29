import React, { Component } from 'react';

class UserAssignment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const disabledClasses = this.props.user.active ? "" : " disabled";
    return (
      <li className={"list-group-item " + disabledClasses}>{this.props.user.user.name}</li>
    )
  }
}

export default UserAssignment;
