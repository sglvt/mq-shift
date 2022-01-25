import axios from 'axios';

export default class Common {

  static getTimestamp() {
    let now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }

  static areCredentialsSet(component) {
    if (sessionStorage.getItem('username') === null) {
      component.setState({ status: `error: credentials not set` })
      return false
    }
    if (sessionStorage.getItem('password') === null) {
      component.setState({ status: `error: credentials not set` })
      return false
    }
    return true
  }
  
  static getOptions(component) {
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
            component.setState({ status: `no queues found` })
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

          component.setState({ selectOptions: options })
          component.setState({ queueAttributes: attributes })
          return response;
        }).catch(error => {
          component.setState({ status: `error "${error}" at ${component.getTimestamp()}` })
          console.log(error)
          return error;
        });
    }
    catch (err) {
      console.log(err)
      component.setState({ status: `error "${err}" at ${component.getTimestamp()}` })
    }
  } 
}