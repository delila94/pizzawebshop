import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';

class Master extends Component {
  render(){
    return (
      <div >
  
<nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <a className="navbar-brand" style={{color:"white"}} href="/">Pizza Yummi</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" style={{color:"white"}} href="/">Home <span className="sr-only">(current)</span></a>
      <a className="nav-item nav-link" style={{color:"white"}} href="#/display-item">Make Order</a>
    </div>
  </div>
</nav>
           
          <div>
              {this.props.children}
          </div>

      </div>


    )
  }
}
export default Master;