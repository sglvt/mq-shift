import React, { Component } from 'react';
import Navitem from './Navitem';

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
      <nav style={{hwidth: '100%',left: '0em', top: '0em', backgroundColor: '#1f3044'}}>
        <table>
          <tbody>
            <tr style={{height: 'calc(10px + 5vmin)',width: '100%',left: '0em', top: '0em', backgroundColor: '#1f3044'}}>
              <Navitem item="Home" tolink="/" activec={this.activeitem}></Navitem>
              <Navitem item="Fetch" tolink="/fetch" activec={this.activeitem} ></Navitem>
              <Navitem item="Move" tolink="/move" activec={this.activeitem} ></Navitem>
              <Navitem item="Insert" tolink="/insert" activec={this.activeitem} ></Navitem>
            </tr>
          </tbody>
        </table>
      </nav>
    )
  }
}

export default Navbar