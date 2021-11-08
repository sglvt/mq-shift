import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import styles from '../styles.js'

class Navitem extends Component {

  render() {
    return (
      <td id={this.props.item}>
        <Link
          style={{
            color: '#fff',
            "&:hover": {
              color: "#efefef",
              backgroundColor: "#efefef",
              textDecoration: "bold"
            },
            textDecoration: 'none', marginLeft: '2em'
          }}
          to={this.props.tolink} onClick={this.props.activec.bind(this, this.props.item)}>{this.props.item}
        </Link>

      </td>
    )
  }
}

export default Navitem