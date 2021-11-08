import React, { Component } from 'react';
import Navitem from './Navitem';
import './Navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'NavItemActive': ''
    }
  }
  activeitem = (x) => {
    if (this.state.NavItemActive.length > 0) {
      document.getElementById(this.state.NavItemActive).classList.remove('active');
    }
    this.setState({ 'NavItemActive': x }, () => {
      document.getElementById(this.state.NavItemActive).classList.add('active');
    });
  };
  render() {
    return (
      <nav>
        <table>
          {/* <tr style={{backgroundColor: "#1f3044"}}> */}
          <tbody>
            <tr>
              <Navitem item="Home" tolink="/" activec={this.activeitem}></Navitem>
              <Navitem item="Fetch" tolink="/fetch" activec={this.activeitem} ></Navitem>
            </tr>
          </tbody>
        </table>
      </nav>
    )
  }
}

export default Navbar