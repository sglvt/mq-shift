
import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default class App extends Component {

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
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
    <p>You have selected <strong>{this.state.name}</strong></p>
      </div>
    )
  }
}