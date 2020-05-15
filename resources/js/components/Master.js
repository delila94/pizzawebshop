import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';

class Master extends Component {
  render(){
    return (
      <div >
  
<nav className="navbar navbar-expand-lg" style={{backgroundColor:"#313184"}}>
  <a className="navbar-brand" style={{color:"white"}} href="/">Pizza Yummi</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" style={{color:"white"}} href="/">Home <span className="sr-only">(current)</span></a>
      <a className="nav-item nav-link" style={{color:"white"}} href="#/display-item">Order Online</a>
    </div>
  </div>
</nav>
           
          <div>
              {this.props.children}
          </div>   
<footer id="sticky-footer" class="py-4 bg-dark text-white-50" style={{color:"white"}}>
<div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <h4 class="font-weight-light mt-4 text-white">WORKING HOURS</h4>
          <p>
            We are delivering whole day long to keep you happy. You can start orderning from 8 AM until 10 PM
          </p>
        </div>
        <div class="col-md-4">
          <h4 class="font-weight-light mt-4 text-white">ABOUT US</h4>
          <p>
          The secret to our food? It’s pretty simple. Source fresh, quality ingredients. Prepare dishes with care and passion. Serve them with a warm smile
          </p>
        </div>
        <div class="col-md-4">
          <h4 class="font-weight-light mt-4 text-white">COMPANY</h4>
          <p>
          We’re Europe’s favourite pizza chain for a lot of reasons. Before that box ever arrives at your door, a diverse team of talented people make it happen, from the head office to the kitchen counter.
          </p>
        </div>
      </div>
    </div>
  </div>   
    <div class="container text-center">
      <small>Copyright &copy; Halac Delila</small>
    </div>
  </footer>

      </div>
      


    )
  }
}
export default Master;