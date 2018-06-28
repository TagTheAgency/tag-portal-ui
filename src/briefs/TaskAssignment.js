import React, { Component } from 'react';

class TaskAssignment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-group-item">{this.props.task.task.name}</li>
    )
  }
}

export default TaskAssignment;
