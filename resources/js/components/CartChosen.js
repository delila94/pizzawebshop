import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {Button, Modal} from 'react-bootstrap';


class CartChosen extends Component {
  constructor(props) {
      super(props);
      this.state={products:[],total:'',qty:'',shipping:0,totalShip:'0',show: false,showEmpty:false, fields:{name: '',lname: '',address: '',email: '',phone:'',city:'',zip:''}, errors:{}}
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
      this.setState({shipping:0});
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
     
    this.setState({ total: responseT.data},()=>{if(this.state.total==0){
      this.setState({shipping:0});
    } else{
      this.setState({shipping:10}); 
    }
    } );
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
        this.setState({ total: responseT.data},()=>{if(this.state.total==0){
          this.setState({shipping:0});
        } else{
          this.setState({shipping:10}); 
        }});
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
   //City
   if(!fields["city"]){
    formIsValid = false;
    errors["city"] = "Cannot be empty";
 }

 else if(typeof fields["city"] !== "undefined"){
    if(!fields["city"].match(/^[a-zA-Z]+$/)){
       formIsValid = false;
       errors["city"] = "Only letters";
    }        
 }
 //zip
 if(!fields["zip"]){
  formIsValid = false;
  errors["zip"] = "Cannot be empty";
}  

   this.setState({errors: errors});
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
             this.setState({shipping:0});
          }
        else
         {
             e.preventDefault();
             this.setState({showEmpty: !this.state.showEmpty});
        }
    }
}
  render() {
    let array = [ "1", "2", "3", "4", "5", "6", "7","8","9","10","11","12"];
    let images = array.map(image => {
    return <img key={image} src={require(`./${image}.png`)} style={{width:"70%", height:"auto"}} alt="" className="img-responsive" />
    });
    return (
 <div className="container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
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
        <div>
    <h2 style={{margin:"20px"}}>Review your order:</h2>
    
</div>
<div className="justify-content-center">
<div className="row ">
             {this.state.products.map((data,mykey)=>
          <div className="col-lg 6 col-md-6 col-sm-12 col-xs-12"  key={mykey}>
            <div className="card mb-4 ml-2 mr-2 " style={{width: "260px"}}  >

  <p className="card-img-top">{images[data.id-1]} </p>
      <div className="card-body">
    <h5 className="card-title">{data.name}</h5>
<p className="card-text">{data.description}</p>
  </div>
  <ul className="list-group list-group-flush">
<li className="list-group-item">Price: {data.price}$({Math.floor(data.price*0.92 * 100) / 100}€)</li>
<li className="list-group-item">Change Qty: <button className="btn" type="button" onClick={(e)=> this.updateCart(data.id,1)}><i style={{fontSize:"30px"}} className="material-icons">add_circle_outline</i></button>
             <b>{data.quantity}</b> 
       <button className="btn" disabled={data.quantity==1} type="button" onClick={(e)=> this.updateCart(data.id,-1)}><i style={{fontSize:"30px"}} className="material-icons">remove_circle_outline</i></button>    
      </li>
      <li className="list-group-item">Total: <b>{data.quantity*data.price}$({Math.floor(data.quantity*data.price*0.92 * 100) / 100 }€)</b>
      </li>
  </ul>
  <div className="card-body row justify-content-center">
  <button type="button" onClick={(e)=>this.handleSubmitRemove(data.id)} className="btn btn-danger">Remove</button>
  </div>
  </div>
         </div>   
            )}
        </div> 
        </div>  

<div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
        <h4>Order Summary €:</h4>
<table className="table table-borderless table-hover">
    <tbody>
        <tr>
          <th >Subtotal: €</th>
            <td>{Math.floor(this.state.total*0.92 * 100) / 100}€</td>   
        </tr>
        
        <tr>
          <th>Shipping €:</th>
            <td>{Math.floor(this.state.shipping*0.92 * 100) / 100}€</td>
        </tr>
        <tr>
          <th>Order total:</th>
          <td style={{textDecoration:"bold"}}>{Math.floor(((this.state.total+this.state.shipping)*0.92) * 100) / 100}€</td> 
        </tr>

    </tbody>
</table>
        </div>
        <div className="col-lg-6">
        <h4>Order Summary $:</h4>
<table className="table table-borderless table-hover">
    <tbody>
        <tr>
          <th >Subtotal: $</th>
            <td>{this.state.total}$</td>   
        </tr>
        
        <tr>
          <th>Shipping$:</th>
            <td>{this.state.shipping}$</td>
        </tr>
        <tr>
          <th>Order total:</th>
            <td>{this.state.total+this.state.shipping}$</td>
        </tr>
    </tbody>
</table>
        </div>
        </div>
        </div>
<div  style={{margin:"25px",textAlign:"center"}}>
<button className="btn btn-danger justify-content-md-center btn-lg" onClick={this.handleSubmitClear} syle={{margin: "30px" ,display: "block"}}>Clear Cart</button> 
</div>
<div className="container" style={{border:"dotted", marginBottom:"20px"}}>
<h2 >Shipping Address</h2>
<div className="container">
      <div className="row justify-content-center">
<div  className="col-lg-6">
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
    <label >Email address</label>
    <input ref="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    <span className="error" style={{color:"red"}}>{this.state.errors["email"]}</span>
    <br/>
  </div>
  </div>
  <div  className="col-lg-6">
	<div className="form-group">
    <label >Adress Line</label>
    <input ref="address" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["addres"]} type="address" className="form-control" id="exampleAddress" aria-describedby="emailHelp" placeholder="Street address, Company Name, c/o"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["address"]}</span>
    <br/>
    </div>
    <div className="form-group row">
    <div className="col">
    <label >City</label>
    <input ref="city" onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]} type="city" className="form-control" id="exampleCity" aria-describedby="citylHelp" placeholder="eg. Las Vegas"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["city"]}</span>
    </div>
    <div className="col">
    <label >Zip</label>
    <input ref="zip" onChange={this.handleChange.bind(this, "zip")} value={this.state.fields["zip"]} type="number" className="form-control" id="exampleZip" aria-describedby="ziplHelp" placeholder="eg. 89101"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["zip"]}</span>
    </div>
    </div>
    <br/>
  <div className="form-group">
    <label >Phone Number:</label>
    <input ref="phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]} type="number" className="form-control" id="exampleInputPhone" placeholder="Phone Number"/>
    <span className="error" style={{color:"red"}}>{this.state.errors["phone"]}</span>
    <br/>  
  </div>
   </div>  
    </div>
    </div>
    </div>
    <h4> <b>Order total: {this.state.total+this.state.shipping}$</b></h4>
  <small id="placeHelp" className="form-text text-muted">By placing your order, you agree to yummi pizza’s privacy notice and conditions of use.</small>
    <button type="button" disabled={this.state.total==0} style={{marginBottom:"20px",marginTop:"10px"}} className="btn btn-success" onClick={this.contactSubmit.bind(this)}>Place Your Order</button> 
    </div>
    );
  }
}

export default CartChosen;