import React, { Component } from 'react';

class HomePizza extends Component {
  render(){
    return (
    <div>
     <div style={{margin:"15px"}} className="row justify-content-center">
      <h1>Welcome to pizza yummi</h1>
      </div>
      <div style={{margin:"15px"}} className="row justify-content-center">
      <img className="img-fluid" src={ require('./pizza1.png') } />
      </div>
    </div>
    )
  }
}
export default HomePizza;