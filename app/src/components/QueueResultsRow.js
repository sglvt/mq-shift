import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class QueueResultsRow extends PureComponent {
  static propTypes = {
    queueName: PropTypes.string
  };

  render() {
    return (
      // <div>
        <option
          // style={{
          //   color: '#ccccc',
          //   align: 'centered',
          //   verticalAlign: 'centered',
          //   textDecoration: 'none', 
          //   padding: '0.7em 0.7em 0.5em 0.5em',
          //   backgroundColor: '#000000',
          //   width: '10em'

          // }}
        >{this.props.queueName}</option>
      // </div>
    );
  }
}