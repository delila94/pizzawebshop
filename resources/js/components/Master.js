import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';

// <img src={ require('./pizza1.jpg') } />
class Master extends Component {
  render(){
    return (
      <div className="container">
   
   <nav class="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li><h3><Link to="/">Home   .</Link></h3></li>
              <li> <h3><Link to="display-item">Make order</Link></h3></li>
            </ul>
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