import React, {Component} from 'react';
import { hashHistory } from 'react-router';

class OrderCompleted extends Component {
  constructor(props) {
       super(props);
       this.handleSubmit=this.handleSubmit.bind(this);
     }
   
   handleSubmit()
   {
     hashHistory.push('/');
   }


  render(){
    const centered ={
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
    return (
      <div style={centered} className="row justify-content-md-center" style={{margin:"20px"}}>
        <div className="container justify-content-md-center">
          <div className="row justify-content-md-center">
        <h1>Thank you for shopping with us.We hope to see you again soon!</h1>
        <h1 className="row justify-content-md-center">Your order has been placed!</h1>
        <img
          className="d-block w-40 row justify-content-md-center"
          src={ require('./completed.png') }
        />
          </div>
       </div>
     </div>
    )
  }
}
export default OrderCompleted;