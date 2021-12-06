
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
      queueName: '',
      quantity: 1
    }
  }

  async getOptions() {
    const res = await axios.get('http://localhost:8080/queue-list')
    const data = res.data

    const options = data.map(d => ({
      "value": d,
      "label": d

    }))

    this.setState({ selectOptions: options })

  }

  handleQueueChange(e) {
    console.log(e)
    this.setState({ queueName: e.label })
  }

  handleQuantityChange(e) {
    console.log(e)
    this.setState({ quantity: e.target.value })
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
        <div style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
          <div style={{ left: '0vmin', top: '0vmin', backgroundColor: '#99ccff', fontSize: 'calc(9px + 1vmin)' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div style={{ width: "50vmin" }}>
                      <Select id="queue" options={this.state.selectOptions} onChange={this.handleQueueChange.bind(this)} />
                    </div>
                  </td>
                  <td>
                    <label for="quantity" style={{ paddingLeft: '2vmin' }}>Number of messages: </label>
                    <input type="number" id="quantity" name="quantity" min="1" max="100" placeholder="1" style={{ fontSize: 'calc(10px + 2vmin)' }} onChange={this.handleQuantityChange.bind(this)}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div><p>Selected Queue: {this.state.queueName}</p></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <textarea style={{ height: '100%', width: '100%', left: '0em', top: '0em' }}
              value={this.state.queueName + ' ' + this.state.quantity}
              readonly
              rows={50}
              cols={100}
            />
          </div>
        </div>
      </div>
    )
  }
}