import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import styles from '../styles'

class Navitem extends Component {
  render() {
    return (
        <td id={this.props.item}>
          <Link style={{ color: '#7ed5ea', textDecoration: 'none' }} to={this.props.tolink} onClick={this.props.activec.bind(this, this.props.item)}>{this.props.item}</Link>
        </td>
    )
  }
}

export default Navitem