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
            padding: '1vmin 1vmin 1vmin 1vmin',
            fontSize: 'calc(10px + 1vmin)',
            fontFamily: 'Arial, Helvetica, sans-serif'
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