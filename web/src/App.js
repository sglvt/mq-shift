import React, { Component } from 'react';
import Navbar from './components/Navbar';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange(e) {
    console.log(e)
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    console.log(e)
    this.setState({ password: e.target.value })
  }

  handleButtonClick(e) {
    console.log(e)
    sessionStorage.setItem('username', this.state.username)
    sessionStorage.setItem('password', btoa(this.state.password))
  }


  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div style={{
            left: '0vmin',
            top: '0vmin',
            backgroundColor: '#99ccff',
            fontSize: 'calc(10px + 1vmin)',
            fontWeight: 'bold'
          }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div style={{ width: '2vmin' }}></div>
                  </td>
                  <td>
                    <label className="regular-text">User</label>
                    <input type="text" className="regular-text"
                      id="username"
                      name="username"
                      onChange={this.handleUsernameChange.bind(this)}>
                    </input>
                  </td>
                  <td>
                    <label className="regular-text">Password</label>
                    <input type="password" className="regular-text"
                      id="password"
                      name="password"
                      onChange={this.handlePasswordChange.bind(this)}>
                    </input>
                  </td>
                  <td>
                    <div style={{ width: '2vmin' }}></div>
                  </td>
                  <td>
                    <button className="orange-button"
                      onClick={this.handleButtonClick.bind(this)}
                    >Set Session Credentials</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><b>Fetch</b>: retrieve a message from a queue</li>
            <li><b>Move</b>: move(or copy if acknowledge is disabled) a number of messages between two queues</li>
            <li><b>Insert</b>: insert a message into a queue</li>
          </ul>
        </div>
      </div>
    );
  }
}
