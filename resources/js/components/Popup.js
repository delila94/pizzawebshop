import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }
  export default Popup