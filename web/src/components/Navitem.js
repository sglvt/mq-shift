import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

function mouseOver(e) {
  e.target.style.color = 'red';
  e.target.style.background = '#fff';
}

function mouseOut(e) {
  e.target.style.color = '#fff';
  e.target.style.background = '#1f3044';
}

class Navitem extends Component {

  render() {
    return (
      <td id={this.props.item}>
        <Link
          style={{
            color: '#fff',
            align: 'centered',
            verticalAlign: 'centered',
            textDecoration: 'none', 
            padding: '0.7em 0.7em 0.5em 0.5em'
          }}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          to={this.props.tolink} onClick={this.props.activec.bind(this, this.props.item)}>{this.props.item}
        </Link>

      </td>
    )
  }
}

export default Navitem