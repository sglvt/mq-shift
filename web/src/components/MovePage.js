
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Navbar from './Navbar';
import './page.css';

export default class FetchPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      sourceQueueName: '',
      destQueueName: '',
      quantity: 1,
      data: [],
      status: '',
      acknowledge: true
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

  getTimestamp() {
    let now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }

  handleSourceQueueChange(e) {
    console.log(e)
    this.setState({ sourceQueueName: e.label })
  }

  handleDestQueueChange(e) {
    console.log(e)
    this.setState({ destQueueName: e.label })
  }

  handleQuantityChange(e) {
    console.log(e)
    this.setState({ quantity: e.target.value })
  }

  handleAcknowledgeCheckbox(e) {
    console.log(e)
    let ack = !(this.state.acknowledge)
    this.setState({ acknowledge: ack })
  }

  handleButtonClick(e) {
    if (this.state.destQueueName !== '') {
      if (this.state.sourceQueueName !== '') {
        console.log(e)
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        try {
          formData.append('mqUser', sessionStorage.getItem('username'))
          formData.append('mqPassword', atob(sessionStorage.getItem('password')))
          formData.append('count', this.state.quantity)
          formData.append('sourceQueueName', this.state.sourceQueueName)
          formData.append('destQueueName', this.state.destQueueName)
          let ack = (this.state.acknowledge === true) ? 'True' : 'False'
          formData.append('acknowledge', ack)
          this.setState({ data: [] })
          formData.append('durable', this.state.queueAttributes[this.state.sourceQueueName]['durable'])
          axios.post('http://localhost:8080/move-messages', formData, config)
            .then(response => {
              if (response.data.length === 0) {
                this.setState({ status: `queue is empty` })
              }
              else {
                this.setState({ status: `successfully retrieved ${response.data.length} messages at ${this.getTimestamp()}` })
              }
              this.setState({ data: response.data })
              console.log(`this.state.data=${this.state.data}`)
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
      else {
        this.setState({ status: `error: no source queue selected` })
      }
    }
    else {
      this.setState({ status: `error: no dest queue selected` })
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
                        onChange={this.handleSourceQueueChange.bind(this)}
                      />
                    </div>
                  </td>
                  <td>
                    <p className="regular-text">Dest. Queue</p>
                  </td>
                  <td>
                    <div style={{ width: "50vmin" }}>
                      <Select
                        className="select"
                        id="destQueue"
                        options={this.state.selectOptions}
                        onChange={this.handleDestQueueChange.bind(this)}
                      />
                    </div>
                  </td>
                  <td>
                    <div style={{ width: '2vmin' }}></div>
                  </td>
                  <td>
                    <label className="numeric-input">Number of messages: </label>
                    <input type="number" className="numeric-input"
                      id="quantity"
                      name="quantity"
                      min="1" max="100"
                      placeholder="1"
                      onChange={this.handleQuantityChange.bind(this)}>
                    </input>
                  </td>
                  <td>
                    <div style={{ width: '2vmin' }}></div>
                  </td>
                  <td>
                    <button className="orange-button"
                      onClick={this.handleButtonClick.bind(this)}
                    >Move</button>
                  </td>
                  <td>
                    <input type="checkbox" name="acknowledge"
                      checked={this.state.acknowledge}
                      onChange={this.handleAcknowledgeCheckbox.bind(this)}
                    />
                    <label for="acknowledge"
                      className="regular-text"
                    > Acknowledge</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p
              style={{ color: '#003366', fontSize: 'calc(9px+1vmin)', fontWeight: 'normal' }}
            >{this.state.status}</p>

            {this.state.data.map((message, index) => (
              <textarea style={{ width: '100%', left: '10em', top: '10em' }}
                key={index}
                value={message}
                readOnly
                rows={3}
                cols={100}
              />
            ))}

          </div>
        </div>
      </div>
    )
  }
}