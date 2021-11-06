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
        <div className="message-row">
          {this.renderMessage("msg1")}
        </div>
      </div>
    );
  }
}

class RootPage extends React.Component {
  renderMessage(s) {
    return <Message value={s} />;
  }

  render() {

    return (
      <div>
        <div className="message-row">
          {this.renderMessage("Loaded the Root page")}
        </div>
      </div>
    );
  }
}

class FetchPage extends React.Component {
  renderMessage(s) {
    return <Message value={s} />;
  }

  render() {

    return (
      <div>
        <div className="message-row">
          {this.renderMessage("Loaded the Fetch page")}
        </div>
      </div>
    );
  }
}

class AppContent extends React.Component {
  renderMessage(s) {
    return <Message value={s} />;
  }

  render() {

    return (
      <ReactDOM.Switch>
        <ReactDOM.Route exact path='/' component={RootPage} />
        <ReactDOM.Route path='/fetch' component={FetchPage} />
      </ReactDOM.Switch>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <table>
          <tbody>
            {/* Navigation Sidebar */}
            <tr>
              <td>
                <nav style={styles.sidebar}>
                  <table>
                    <tbody>
                      <tr>
                        <td style={styles.sidebarItem}>
                          <a href="/">Overview</a>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.sidebarItem}>
                          <a href="/">Fetch</a>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.sidebarItem}>
                          <div id="move-button-container"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </nav>
              </td>
            </tr>
            {/* Content Area */}
            <tr>
              <td style={styles.content}>
                <div id="form-container"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      name: ''
    };
  }

  onChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <label form='name-input'>Name: </label>
        <input
          id='name-input'
          onChange={this.onChange}
          value={this.state.name} />
        <br/>
        <h3>{this.state.name}</h3>
      </div>
    )
  }
}

// ========================================

const AppContainer = document.querySelector('#app-container');
ReactDOM.render(
  <App />,
  AppContainer
);

const FormContainer = document.querySelector('#form-container');
ReactDOM.render(
  <Form />,
  FormContainer
);