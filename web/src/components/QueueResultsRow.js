import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class QueueResultsRow extends PureComponent {
  static propTypes = {
    queueName: PropTypes.string
  };
  
  sayHello() {
    alert(this.props.queueName);
  }

  render() {
    return (
        <option
          // onClick={this.sayHello()}
        >{this.props.queueName}</option>
    );
  }
}