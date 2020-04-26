import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRowChosen from './TableRowChosen';
import MyGlobleSetting from './MyGlobleSetting';
class DisplayChosenProducts extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', products: ''};
     }
     componentDidMount(){
       axios.get(MyGlobleSetting.url + '/cart')
       .then(response => {
         this.setState({ products: response.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     tabRow(){
        /* if(this.state.products instanceof Array){
           return this.state.products.map(function(object, i){
               return ;
  
           })
         }*/
         if(this.state.products instanceof Array){
            return this.state.products.map(function(object, i){
             return <TableRowChosen obj={object} key={i} />;
   
            })
          }
       }

  render(){
    return (


      <div>
        <h1>Your pizza order:</h1>



        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Pizza Title</td>
                <td>Pizza Description</td>
                <td>Pizza Price</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    <div>Total price in Euro:</div>
    <div>Total price in Dollar:</div>

              <h1>Person details</h1>
<div className="row">
  <div className="col-md-10"></div>
</div>
<form onSubmit={this.handleSubmit}>
    <div className="form-group">
        <label name="person-name">Name:</label>
        <textarea className="form-control"></textarea>  
    </div>
    <div className="form-group">
        <label name="person-lastname">Last Name:</label>
        <textarea className="form-control"></textarea>  
    </div>
    <div className="form-group">
        <label name="person-addres">Type your address:</label>
        <textarea className="form-control"></textarea>  
    </div>
    <div className="form-group">
        <label name="person-phone">Phone Number:</label>
        <textarea className="form-control"></textarea>  
    </div>
    <button className="btn btn-dark"><Link to="order-completed">Comlplete order</Link></button>
              
</form>      
          
    </div>

    
    )
  }
}
export default DisplayChosenProducts;