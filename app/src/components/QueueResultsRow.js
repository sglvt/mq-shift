import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class QueueResultsRow extends PureComponent {
  static propTypes = {
    queueName: PropTypes.string
  };

  render() {
    return (
      <div>
        <h3>{this.props.queueName}</h3>
      </div>
    );
  }
}