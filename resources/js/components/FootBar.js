import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import { getProfile } from './UserFunctions'
class FootBar extends Component {
    render () {
        return (
<div style={{marginTop:"50px"}}>
<footer id="sticky-footer" className="py-4 bg-dark text-white-50" style={{color:"white"}}>
<div>
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h4 className="font-weight-light mt-4 text-white">WORKING HOURS</h4>
          <p>
            We are delivering whole day long to keep you happy. You can start orderning from 8 AM until 10 PM
          </p>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-light mt-4 text-white">ABOUT US</h4>
          <p>
          The secret to our food? It’s pretty simple. Source fresh, quality ingredients. Prepare dishes with care and passion. Serve them with a warm smile
          </p>
        </div>
        <div className="col-md-4">
          <h4 className="font-weight-light mt-4 text-white">COMPANY</h4>
          <p>
          We’re Europe’s favourite pizza chain for a lot of reasons. Before that box ever arrives at your door, a diverse team of talented people make it happen, from the head office to the kitchen counter.
          </p>
        </div>
      </div>
    </div>
  </div>   
    <div className="container text-center">
      <small>Copyright &copy; Halac Delila</small>
    </div>
  </footer>
  </div>
        );}
}
export default FootBar;