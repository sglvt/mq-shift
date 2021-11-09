import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import QueueResultRow from "./QueueResultsRow";

export default class QueueResults extends PureComponent {
  static propTypes = {
    queueData: PropTypes.array
  };

  // componentDidMount() {
  //   this.clipboard = new Clipboard(".copy-to-clipboard");
  // }

  // componentWillUnmount() {
  //   this.clipboard.destroy();
  // }

  render() {
    return (
      <div>
        <select name="queues" multiple style={{height:"30em", width:"20em"}}>
          {this.props.queueData.map(queueData => (
            <QueueResultRow
              queueName={queueData.queueName}
              key={queueData.queueName}
            />
          ))}
        </select>
      </div>
    );
  }
}