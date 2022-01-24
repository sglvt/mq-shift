
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Navbar from './Navbar';
import './page.css';

export default class InsertPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      queueAttributes: [],
      queueName: '',
      message: '',
      status: ''
    }
  }

  async getOptions() {

    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    let formData = new FormData();
    try {
      formData.append('mqUser', sessionStorage.getItem('username'))
      formData.append('mqPassword', atob(sessionStorage.getItem('password')))
      axios.post('http://localhost:8080/queue-list', formData, config)
        .then(response => {
          if (response.data.length === 0) {
            this.setState({ status: `no queues found` })
          }
          const data = response.data

          const options = data.map(d => ({
            "value": d.name,
            "label": d.name
          }))

          let attributes = {}
          console.log(data)
          for (let k in Object.keys(data)) {
            console.log(`${data[k]['name']} ${data[k]['durable']}`)
            attributes[data[k]['name']] = {}
            attributes[data[k]['name']]['durable'] = data[k]['durable']
          }

          this.setState({ selectOptions: options })
          this.setState({ queueAttributes: attributes })
          return response;
        }).catch(error => {
          this.setState({ status: `error "${error}" at ${this.getTimestamp()}` })
          console.log(error)
          return error;
        });
    }
    catch (err) {
      console.log(err)
      this.setState({ status: `error "${err}" at ${this.getTimestamp()}` })
    }
  }

  handleQueueChange(e) {
    console.log(e)
    this.setState({ queueName: e.label })
    // this.setState({ durable: selectOptions[e.label] })
  }

  handleMessageChange(e) {
    console.log(e)
    this.setState({ message: e.target.value })
  }

  areCredentialsSet() {
    if (sessionStorage.getItem('username') === null) {
      this.setState({ status: `error: credentials not set` })
      return false
    }
    if (sessionStorage.getItem('password') === null) {
      this.setState({ status: `error: credentials not set` })
      return false
    }
    return true
  }

  handleButtonClick(e) {
    if (!this.areCredentialsSet()) return;
    if (this.state.queueName === '') {
      this.setState({ status: `error: no queue selected` })
      return
    }
    console.log(e)
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    console.log(this.state.message)
    let formData = new FormData();
    let now = new Date();
    try {
      formData.append('mqUser', sessionStorage.getItem('username'))
      formData.append('mqPassword', atob(sessionStorage.getItem('password')))
      formData.append('message', this.state.message)
      formData.append('queueName', this.state.queueName)
      formData.append('durable', this.state.queueAttributes[this.state.queueName]['durable'])
      axios.post('http://localhost:8080/insert-message', formData, config)
        .then(response => {
          this.setState({ status: `successfully inserted at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` })
          return response.data;
        }).catch(error => {
          return error;
        });
    }
    catch (err) {
      console.log(err)
      this.setState({ status: `error "${err}" at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` })
    }

  }

  componentDidMount() {
    this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
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
                    <p className="regular-text">Queue</p>
                  </td>
                  <td>
                    <div style={{ width: "50vmin" }}>
                      <Select
                        className="select"
                        id="queue"
                        options={this.state.selectOptions}
                        onChange={this.handleQueueChange.bind(this)}
                      />
                    </div>
                  </td>
                  <td>
                    <button className="orange-button"
                      onClick={this.handleButtonClick.bind(this)}
                    >Insert message</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p
              style={{ color: '#003366', fontSize: 'calc(9px+1vmin)', fontWeight: 'normal' }}
            >{this.state.status}</p>
            <textarea
              name='message'
              style={{ width: '100%', left: '10em', top: '10em' }}
              rows={10}
              cols={100}
              onChange={this.handleMessageChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}