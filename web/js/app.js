class Message extends React.Component {
  render() {
    return (
      <h3 className="message">
        {this.props.value}
      </h3>
    );
  }
}

class Tab extends React.Component {
  renderMessage(s) {
    return <Message value={s} />;
  }

  render() {

    return (
      <div>
        <div>
          <a href="">Get</a>
        </div>
        <div>
          <a href="">Move</a>
        </div>
        <div className="board-row">
          {this.renderMessage("msg1")}
          {this.renderMessage("msg2")}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="tab">
          <Tab />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const ConfirmButtonContainer = document.querySelector('#app-container');
ReactDOM.render(
  <App />,
  ConfirmButtonContainer
);
