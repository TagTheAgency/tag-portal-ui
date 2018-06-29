import React, { Component } from 'react';

class TaskAssignment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const disabledClasses = this.props.task.active ? "" : " disabled";
    return (
      <li className={"list-group-item " + disabledClasses}>{this.props.task.task.name}</li>
    )
  }
}

export default TaskAssignment;
