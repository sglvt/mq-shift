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
                          <a href="/">Move</a>
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
                <div className="tab">
                  <Tab />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
