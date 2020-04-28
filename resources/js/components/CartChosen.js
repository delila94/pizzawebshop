import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';


class CartChosen extends Component {
  constructor(props) {
      super(props);
      this.state={products:[],total:'' }
     // this.handleSubmit = this.handleSubmit.bind(this);
     // this.handleSubmit2 = this.handleSubmit2.bind(this);
      this.handleSubmit3 = this.handleSubmit3.bind(this);
   //   this.qty = this.qty.bind(this);
   //  this.id = this.id.bind(this);
  }
  
  handleSubmit3(e) {
    axios.get('clear') ;
    browserHistory.push('/display-item');
    alert("your cart is empty");

}
handleSubmitC(e) {
    axios.get('clear') ;

}
componentDidMount() {
  axios.get('myCart') 
  .then(response => {

    this.setState({ products: Object.values(response.data)});

  })
  .catch(function (error) {
    console.log(error);
  })
  axios.get('total') 
  .then(response => {
     
    this.setState({ total: response.data});

  })
  .catch(function (error) {
    console.log(error);
  })
}
qtyCart(e) {
    
    e.preventDefault()

      console.log(e.target.value);
      this.setState({qty:e.target.value});
   
      
    
  }
  handleSubmitCart(e,id) {

    e.preventDefault();
  axios.post('changeme',{qty:this.state.qty,
    id:id})
    .then(res=> {console.log(res.data); } );
    alert("ccc");
  
   
}
handleSubmitRemove(id) {

  axios.post('remove',{id:id})
    .then(res=> {console.log(res.data); } );
    alert("Pizza removed from cart!");
    window.location.reload();
  
   
}
  
//  <input style={{margin: "10px"}} type="number" min="1" max="10" onChange={(e)=> this.qtyCart(e)}></input>
    
//<input value={data.id} type="number" onChange={(e)=> this.id(e)}></input>
//  <button type="submit"  className="btn btn-secondary" >Add to Cart</button>
  render() {
    return (
      
       
          <div>
                <h2>Your order:</h2>
      
                <form onChange={this.handleSubmit}>
        <table className="table table-hover">
            
  <thead>
      
    <tr>
      <th scope="col"style={{width: "10%"}}>ID</th>
      <th scope="col"style={{width: "10%"}}>Pizza Name</th>
      <th scope="col"style={{width: "10%"}}>Pizza Price $</th>
      <th scope="col" style={{width: "10%"}}>Quantity</th>
      <th scope="col" style={{width: "10%"}}>Total $:</th>
      <th scope="col" style={{width: "10%"}}>Total €:</th>
      <th scope="col" style={{width: "20%"}}>Remove:</th>
    </tr>
  </thead>
  {this.state.products.map(data=>
  <tbody>
      <td>{data.id}</td>

 
     
      <td>{data.name}</td>
   
     
      <td>{data.price}</td>
  
     
      <td>{data.quantity}</td>
 
      
      <td>{data.quantity*data.price}</td>
      <td>{Math.round(data.quantity*data.price*0.92)}</td>
      <td>
      <button type="button" onClick={(e)=>this.handleSubmitRemove(data.id)} className="btn btn-danger">Remove</button>
          
       
      </td>
 
    
  </tbody>
  )}
</table>
      </form>   
<div>
    <div>
       <div><h4>Total price($):</h4><input type="number"value={this.state.total} ></input>
       </div> 
    <div><h4>Total price (€):</h4></div> <input type="number"value={Math.round(this.state.total*0.92)} ></input>
    <div><h4>Total with delivery +10$ ($):</h4></div> <input type="number"value={Math.round((this.state.total+10))} ></input>
    <div><h4>Total with delivery +10€ (€):</h4></div> <input type="number"value={Math.round(this.state.total*0.92+10)} ></input>
    </div>
<div>
    <br/>
<div><button className="btn btn-danger" onClick={this.handleSubmit3}>Clear Cart</button></div>
</div>
<br></br>
<h1>Person details</h1>
<div className="row">
  <div className="col-md-10"></div>
</div>
<form onSubmit={this.handleSubmit}>
<div className="form-group">
    <label >First Name</label>
    <input type="fname" className="form-control" id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter First Name"/>
    </div>
    <div className="form-group">
    <label >Last Name</label>
    <input type="lname" className="form-control" id="exampleInputlName" aria-describedby="emailHelp" placeholder="Enter Last Name"/>
    </div>
	<div className="form-group">
    <label >Adress</label>
    <input type="address" className="form-control" id="exampleAddress" aria-describedby="emailHelp" placeholder="Enter Address"/>
    </div>
  <div className="form-group">
    <label >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Phone Number:</label>
    <input type="number" className="form-control" id="exampleInputPhone" placeholder="Phone Number"/>
  </div>
    <button className="btn btn-dark" onClick={this.handleSubmitC}><Link to="order-completed">Comlplete order</Link></button>
              
</form>      
    </div> 
    </div>
    );
  }
}


export default CartChosen;