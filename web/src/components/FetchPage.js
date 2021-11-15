
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Navbar from './Navbar';
import './common.css';

export default class FetchPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      id: "",
      queueName: ''
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

  handleChange(e) {
    console.log(e)
    this.setState({ queueName: e.label })
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
        <div>
          <table>
            <tbody>
              <tr style={{height: '3em',width: '25em',left: '0em', top: '0em', backgroundColor: '#d27979', fontSize: 'calc(10px + 2vmin)' }}>
                <td>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: "20em" }}>
                              <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="quantity">Quantity (between 1 and 10): </label>
                            <input type="number" id="quantity" name="quantity" min="1" max="10" style={{fontSize: 'calc(10px + 2vmin)'}}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div><p>Selected Queue:</p> <b>{this.state.queueName}</b></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td>
                  <div>
                    <textarea style={{ height: '100%', width: '100%', left: '0em', top: '0em' }}
                      value={this.state.queueName}
                      readonly
                      rows={50}
                      cols={100}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}