
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Navbar from './Navbar';

export default class InsertPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
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

  handleQueueChange(e) {
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
        <div style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
          <div style={{ left: '0vmin', top: '0vmin', backgroundColor: '#d27979', fontSize: 'calc(10px + 1vmin)' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Queue</p>
                  </td>
                  <td>
                    <div style={{ width: "50vmin" }}>
                      <Select id="queue" options={this.state.selectOptions} onChange={this.handleQueueChange.bind(this)} />
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick=""
                      style={{ paddingLeft: '2vmin', 
                        outline: '0', 
                        boxShadow: '0px 2px 2px lightblue',
                        transition: 'ease background-color 250ms',
                        borderRadius: '5px',
                        fontSize: 'calc(10px + 1vmin)',
                        backgroundColor: '#3f51b5',
                        color: 'white'
                      }}
                    >Insert message</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <textarea style={{ height: '100%', width: '100%', left: '0em', top: '0em' }}
              rows={50}
              cols={100}
            />
          </div>
        </div>
      </div>
    )
  }
}