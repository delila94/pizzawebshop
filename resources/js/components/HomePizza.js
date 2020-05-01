import React, { Component } from 'react';

class HomePizza extends Component {
  render(){
    return (
    <div className="row justify-content-center">
      <h1>Welcome to pizza yummi</h1>
      <img className="img-fluid" src={ require('./pizza1.png') } />
      
    </div>
    )
  }
}
export default HomePizza;