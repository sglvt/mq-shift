import React, { Component } from 'react';
import Navitem from './Navitem';

const styles = {

  sidebar: {
    height: '100%',
    width: '200px',
    left: '0px',
    backgroundColor: '#1f3044',
    position: 'fixed',
    color: '#fffff'
  },

  sidebarItem: {
    color: '#7ed5ea',
    padding: '8px 16px',
    display: 'block',
    textDecoration: 'none',
    textColor: '#c73305',
    backgroundcolor: '#000'
  },

  content: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'fixed',
    left: '210px',
    color: '#ffffff'
  },
}

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
      //       <nav style={{height: '100%',width: '200px',left: '0px', backgroundColor: '#1f3044',
      //  position: 'fixed',
      //  color: '#fffff'}}>
      <nav>
        <table>
          <tr>
            <Navitem item="Home" tolink="/" activec={this.activeitem} style={styles.sidebarItem}></Navitem>
            <Navitem item="Fetch" tolink="/fetch" activec={this.activeitem} style={styles.sidebarItem}></Navitem>
          </tr>
        </table>
      </nav>
    )
  }
}

export default Navbar