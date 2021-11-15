
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Navbar from './Navbar';

export default class FetchPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      id: "",
      name: ''
    }
  }

 async getOptions(){
    const res = await axios.get('http://localhost:8080/queue-list')
    const data = res.data

    const options = data.map(d => ({
      "value" : d,
      "label" : d

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
    console.log(e)
   this.setState({id:e.value, name:e.label})
  }

  componentDidMount(){
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
            <tr>
              <td>
                <div style={{ width: "20em" }}>
                  <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
                </div>
              </td>
              <td>
                <p>placeholder</p>
              </td>
            </tr>
            <tr>
              <td>
                <label for="quantity">Quantity (between 1 and 10): </label>
                <input type="number" id="quantity" name="quantity" min="1" max="10"></input>
              </td>
            </tr>
            <tr>
              <td>
                <div><b>Selected Value: </b> {this.state.name}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}