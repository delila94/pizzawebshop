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
      <div style={centered} className="row justify-content-md-center">
        <div className="container justify-content-md-center">
          <div className="row justify-content-md-center">
            <h1>Order successfully completed!</h1>
          </div>
         <div className="col text-center">
           <button style={{margin:"25px"}} className="btn btn-success btn-lg" onClick={this.handleSubmit}>Home</button>
         </div>
       </div>
     </div>
    )
  }
}
export default OrderCompleted;