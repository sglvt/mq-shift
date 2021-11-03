'use strict';

const cb = React.createElement;

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmed: false };
  }

  render() {
    if (this.state.confirmed) {
      return 'This was confirmed';
    }

    return cb(
      'button',
      { onClick: () => this.setState({ confirmed: true }) },
      'Confirm'
    );
  }
}

const ConfirmButtonContainer = document.querySelector('#confirm-button-container');
ReactDOM.render(cb(ConfirmButton), ConfirmButtonContainer);