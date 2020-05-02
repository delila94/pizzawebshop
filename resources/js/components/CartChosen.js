import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';


class CartChosen extends Component {
  constructor(props) {
      super(props);
      this.state={products:[],total:'',qty:'',fields:{name: '',lname: '',address: '',email: '',phone:''}, errors:{},fname:'',lname:'' }
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
    alert("Your cart is already empty!")
    }
 
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
     console.log(res.data)
    this.setState({products: Object.values(res.data) }); } );
    axios.get('total') 
     .then(responseT => {
           
     this.setState({ total: responseT.data});
      
        })
        .catch(function (error) {
          console.log(error);
        })
      
   
  }
handleSubmitRemove(id)
 {
  axios.post('remove',{id:id})
    .then(res=> {
        
        this.setState({products: Object.values(res.data) }); } );
        
        axios.get('total') 
        .then(responseT => {
           
          this.setState({ total: responseT.data});
      
        })
        .catch(function (error) {
          console.log(error);
        })
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
             alert("Your cart is empty! Please choose something to continue.");
        }
    }
    else
    {
       alert("Please check your personal details and mail address!");
    }

}
  
  render() {
    return (
 <div style={{marginLeft:"15px",marginRight:"15px"}}>
    <h2>Your order:</h2>
    <table className="table table-hover table-responsive{-sm|-md|-lg|-xl}">          
    <thead>
      
       <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price $</th>
        <th scope="col" >Quantity</th>
        <th scope="col">Total $:</th>
        <th scope="col">Total €:</th>
        <th scope="col" >Remove:</th>
        <th scope="col" >Change Quantity:</th>
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
      <button type="button" onClick={(e)=>this.handleSubmitRemove(data.id)} className="btn btn-danger">Remove</button>
      </td>
      <td>
       <button  style={{margin: "3px"}} className="btn btn-secondary" type="button" onClick={(e)=> this.updateCart(data.id,1)}>+</button>
       <button  style={{margin: "3px"}} className="btn btn-secondary" disabled={data.quantity==1} type="button" onClick={(e)=> this.updateCart(data.id,-1)}>-</button>
      </td>
    
   </tr>
  </tbody>
  )}
</table>
      
<div>
    <div>
       <div><h4>Total price: {this.state.total}$</h4> </div>
       <div><h4>Total price: {Math.floor(this.state.total*0.92 * 100) / 100}€</h4> </div>
       <div><h4>Total with delivery +10$: {this.state.total+10}$</h4></div>
       <div><h4>Total with delivery +10€: {Math.floor((this.state.total*0.92+10) * 100) / 100}€</h4></div>
    </div>
<div> 
    <br/>
    <button className="btn btn-danger" onClick={this.handleSubmitClear} syle={{margin: "6px"}}>Clear Cart</button> 
</div>
<br/>

<h1>Person details</h1>
<div className="row" >
  <div className="col-md-10"></div>
</div>
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
    <label >Adress</label>
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
    <button type="button" className="btn btn-dark" onClick={this.contactSubmit.bind(this)}>Complete Your Order</button>            
</form>      
    </div> 
    </div>
    );
  }
}

export default CartChosen;