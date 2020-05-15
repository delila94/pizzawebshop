import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';


class CartChosen extends Component {
  constructor(props) {
      super(props);
      this.state={products:[],total:'',qty:'',totalDelivery:'0',show: false,showEmpty:false, fields:{name: '',lname: '',address: '',email: '',phone:''}, errors:{}}
      this.handleSubmitClear = this.handleSubmitClear.bind(this);
      this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
      this.updateCart = this.updateCart.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.contactSubmit = this.contactSubmit.bind(this);
  }

handleSubmitClear(e) 
{
    if(this.state.total!=0)
    {
      axios.get('clear') ;
      window.location.reload();
    }
    else
    {
     e.preventDefault();
     this.setState({show: !this.state.show});
    }
 
 }
 handleModal() {
  this.setState({show: !this.state.show});
}
handleModalEmpty() {
  this.setState({showEmpty: !this.state.showEmpty});
}
componentDidMount() 
{
  axios.get('myCart') 
  .then(response => {

    this.setState({ products: Object.values(response.data)});

  })
  .catch(function (error) {
    console.log(error);
  })

  axios.get('total') 
  .then(responseT => {
     
    this.setState({ total: responseT.data});

  })
  .catch(function (error) {
    console.log(error);
  })
}
updateCart(id,qty) 
{

    axios.post('update',{qty:qty,id:id})
    .then(res=> {
    // console.log(res.data)
    this.setState({products: Object.values(res.data) },()=>{axios.get('total') 
    .then(responseT => {
    this.setState({ total: responseT.data});
    })}

    ); 
    } );
  
  }
handleSubmitRemove(id)
 {
  axios.post('remove',{id:id})
    .then(res=> {
        
        this.setState({products: Object.values(res.data) }, ()=>{axios.get('total') 
        .then(responseT => {
        this.setState({ total: responseT.data});
        })}
        ); } );
       
}
handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["name"]){
       formIsValid = false;
       errors["name"] = "Cannot be empty";
    }

    else if(typeof fields["name"] !== "undefined"){
       if(!fields["name"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["name"] = "Only letters";
       }        
    }
    //Last Name
    if(!fields["lname"]){
        formIsValid = false;
        errors["lname"] = "Cannot be empty";
       
     }
 
     else if(typeof fields["lname"] !== "undefined"){
        if(!fields["lname"].match(/^[a-zA-Z]+$/)){
           formIsValid = false;
           errors["lname"] = "Only letters";
        }        
     }

     //Address
    if(!fields["address"]){
        formIsValid = false;
        errors["address"] = "Cannot be empty";
     }
 
     else if(typeof fields["address"] !== "undefined"){
        if(!fields["address"].match(/^[#.0-9a-zA-Z\s,-]+$/)){ 
           formIsValid = false;
           errors["address"] = "Cannot contain special characters";
        }        
     }
      //Phone
    if(!fields["phone"]){
        formIsValid = false;
        errors["phone"] = "Cannot be empty";
     }

    //Email
    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "Cannot be empty";
    }

   else if(typeof fields["email"] !== "undefined"){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2))
        {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
   }  

   this.setState({errors: errors});
  // console.log(errors)
   return formIsValid;
}
handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}
contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
        if(this.state.total!=0)
          {
            axios.get('clear') ;
            hashHistory.push('/order-completed');
             e.preventDefault();
          }
        else
         {
             e.preventDefault();
             this.setState({showEmpty: !this.state.showEmpty});
        }
    }
}

  //<h1 style={{margin:"15px"}}>Person details</h1>
  render() {
    return (
 <div style={{marginLeft:"15px",marginRight:"15px"}}>
    <Modal id="#clearCart" show={this.state.show} onHide={()=>{this.handleModal()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body > <p className="row justify-content-center">Your Cart is already empty!</p></Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={()=>{this.handleModal()}}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal id="#emptyCart" show={this.state.showEmpty} onHide={()=>{this.handleModalEmpty()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body > <p className="row justify-content-center">Your cart is empty! Please choose something to continue.</p></Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={()=>{this.handleModalEmpty()}}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div style={{width: "55%", float:"left",marginRight:"25px"}}>
    <h2 style={{margin:"20px"}}>Review your order:</h2>
    <table className="table table-info table-hover table-responsive{-sm|-md|-lg|-xl} ">          
    <thead>
      
       <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price $</th>
        <th scope="col" >Quantity</th>
        <th scope="col">Total $:</th>
        <th scope="col">Total €:</th>
        <th scope="col" >Remove:</th>
        <th scope="col" >Update:</th>
        </tr>
  </thead>

  {this.state.products.map((data,mykey)=>
    <tbody key={mykey}>
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.price}</td>
      <td>{data.quantity}</td>
      <td>{data.quantity*data.price}</td>
      <td>{Math.floor(data.quantity*data.price*0.92 * 100) / 100 }</td>
      <td>
      <button type="button" onClick={(e)=>this.handleSubmitRemove(data.id)} className="btn btn-danger">X</button>
      </td>
      <td>
       <button  style={{margin: "3px"}} className="btn btn-secondary" type="button" onClick={(e)=> this.updateCart(data.id,1)}>+</button>
       <button  style={{margin: "3px"}} className="btn btn-secondary" disabled={data.quantity==1} type="button" onClick={(e)=> this.updateCart(data.id,-1)}>-</button>
      </td>
    
   </tr>
  </tbody>
  )}

</table>
</div>   

<div style={{width: "40%", float:"left",backgroundColor:"#e6e6e6",margin:"15px",border:"solid"}}>
  <h4 style={{margin:"20px"}}>Order Summary $:</h4>
<table class="table table-borderless" style={{width:"400px", margin:"30px"}}>
    <tbody>
        <tr>
          <th >Subtotal: $</th>
            <td>{this.state.total}$</td>   
        </tr>
        
        <tr>
          <th>Shipping$:</th>
            <td>{10}$</td>
        </tr>
        <tr>
          <th>Order total:</th>
            <td>{this.state.total+10}$</td>
        </tr>
    </tbody>
</table>
</div>
<div style={{width: "40%", float:"right",backgroundColor:"#f2f2f2",margin:"25px",border:"solid"}}>
  <h4 style={{margin:"20px"}}>Order Summary €:</h4>
<table class="table table-borderless" style={{width:"400px", margin:"30px"}}>
    <tbody>
        <tr>
          <th >Subtotal: €</th>
            <td>{Math.floor(this.state.total*0.92 * 100) / 100}€</td>   
        </tr>
        
        <tr>
          <th>Shipping €:</th>
            <td>{9.2}€</td>
        </tr>
        <tr>
          <th>Order total:</th>
          <td style={{textDecoration:"bold"}}>{Math.floor((this.state.total*0.92+9.2) * 100) / 100}€</td> 
        </tr>

    </tbody>
</table>
</div>
<div  style={{width: "50%",margin:"25px",textAlign:"center"}}>
<button className="btn btn-danger justify-content-md-center btn-lg" onClick={this.handleSubmitClear} syle={{margin: "30px" ,display: "block"}}>Clear Cart</button> 
</div>
<div style={{ marginTop:"10px"}}>
<h1 >Shipping Address</h1>
</div>
<div  style={{width: "50%"}}>
<form onSubmit={this.handleSubmit} >
<div className="form-group">
    <label >First Name</label>
    <input ref="name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} type="fname" className="form-control" id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter First Name"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["name"]}</span>
    <br/>
    </div>
    <div  className="form-group">
    <label >Last Name</label>
    <input ref="lname" onChange={this.handleChange.bind(this, "lname")} value={this.state.fields["lname"]} type="lname" className="form-control" id="exampleInputlName" aria-describedby="emailHelp" placeholder="Enter Last Name"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["lname"]}</span>
    <br/>
    </div>
	<div className="form-group">
    <label >Adress Line</label>
    <input ref="address" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["addres"]} type="address" className="form-control" id="exampleAddress" aria-describedby="emailHelp" placeholder="Enter Address"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["address"]}</span>
    <br/>
    </div>
  <div className="form-group">
    <label >Email address</label>
    <input ref="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    <span className="error" style={{color:"red"}}>{this.state.errors["email"]}</span>
    <br/>
  </div>
  <div className="form-group">
    <label >Phone Number:</label>
    <input ref="phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]} type="number" className="form-control" id="exampleInputPhone" placeholder="Phone Number"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["phone"]}</span>
    <br/>  
  </div>
  <h4> <b>Order total: {this.state.total+10}$</b></h4>
  <small id="placeHelp" className="form-text text-muted">By placing your order, you agree to yummi pizza’s privacy notice and conditions of use.</small>
    <button type="button" disabled={this.state.total==0} style={{marginBottom:"20px",marginTop:"10px"}} className="btn btn-success" onClick={this.contactSubmit.bind(this)}>Place Your Order</button>            
</form>   
    </div>   
    </div>
    );
  }
}

export default CartChosen;