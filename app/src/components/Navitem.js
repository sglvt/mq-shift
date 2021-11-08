import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

function mouseOver(e) {
  e.target.style.color = 'red';
}

function mouseOut(e) {
  e.target.style.color = '#fff';
}

class Navitem extends Component {

  render() {
    return (
      <td id={this.props.item}>
        <Link
          style={{
            color: '#fff',
            textDecoration: 'none', marginLeft: '2em'
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