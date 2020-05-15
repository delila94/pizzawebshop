import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import Popup from './Popup';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';

class TableRow extends Component {
  constructor(props) {
      super(props);
      super();
     
      this.state={qty:'1',products:[],id:'',cart:[], showZero: false, show: false}
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.qty = this.qty.bind(this);
      this.id = this.id.bind(this);
      this.handleGo = this.handleGo.bind(this);
      this.handleModal = this.handleModal.bind(this);
  }
  handleGo(e)
   {
    hashHistory.push('/cartChosen');
   }
 
  qty(e)
   {
    e.preventDefault()
    if(e.target.value>0)
    {
    this.setState({qty:e.target.value});  
    }
    else {
      this.setState({showZero: !this.state.showZero}); 
    }  
  }
  id(e) 
  {
    e.preventDefault();
    this.setState({id:e.target.value});   
  }

  handleSubmit3(e,id)
   {
    e.preventDefault();
 if(!this.state.qty) {
  this.setState({showError: !this.state.showError});
 }
 else {
    axios.post('add',{qty:this.state.qty,
      id:id})
      this.setState({show: !this.state.show});
     this.setState({qty:'1'});
    } 
}

// <AddModal show={this.state.addModalShow} onHide={addModalClose}/>
// <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}> Open modal </Button>
         
componentDidMount()
{
  axios.get('product')
  .then(response => {
    this.setState({ products: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
}
handleModal() {
  this.setState({show: !this.state.show});
}
handleModalZero() {
  this.setState({showZero: !this.state.showZero});
}
  render() {

    let array = ["4", "1", "2", "3", "0", "5", "6", "7","8","9","10","11"];
    let images = array.map(image => {
    return <img key={image} src={require(`./${image}.png`)} style={{width:"70%", height:"auto"}} alt="" className="img-responsive" />
    });
    return (
  <div className="container">
       <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
           <Modal id="#addedToCart" show={this.state.show} onHide={()=>{this.handleModal()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body className="row justify-content-center" > <span><i style={{color:"green",fontSize:"40px"}} className="material-icons">done</i></span> 
          <p style={{margin:"10px", fontSize:"20px"}}> Product added to your cart!</p></Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.handleModal()}}>Continue Shopping</Button>
            <Button  onClick={()=>{this.handleGo()}}>Go to cart</Button>
          </Modal.Footer>
        </Modal>
        <Modal id="#modalZero" show={this.state.showZero} onHide={()=>{this.handleModalZero()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body> <p className="row justify-content-center">Please choose number bigger than 0 </p></Modal.Body>
        </Modal>
      <h2 style={{margin:"10px"}}>Menu:</h2>
      <div className="row justify-content-center mb-5">
      </div>
         <div className="row justify-content-center">
             {this.state.products.map((data,mykey)=>
          <div className="col-lg 6 col-md-6 col-sm-12 col-xs-12"  key={mykey}>
            <div className="card mb-4 ml-2 mr-2 " style={{width: "260px"}}  >

            <div className="card-image" >
                            <p> { images[mykey] }</p>
                            <h5 className="card-title"><b>{data.title}</b></h5>
                        </div>
                        <div className="card-content">
                            <p>{data.body}</p>
                            <div className="row justify-content-center">
                            <p><b>Price: {data.price}$ ({Math.floor(data.price*0.92 * 100) / 100}€)</b></p>
                            </div>
                            
                            <div  style={{margin:"5px"}} > 
                            Quantity:  <input type="number" min="1" max="10" ref="quantity"  placeholder="1" onChange={(e)=> {this.qty(e)}}></input>
                             <button type="submit" style={{width:"40%", marginTop:"7px",color:"#313184"}} className="btn" onClick={(e)=>{this.handleSubmit3(e,data.id)}}><i style={{fontSize:"40px"}} className="material-icons">add_shopping_cart</i></button>
                             </div>
                        </div>
           </div>
         </div>   
            )}
        </div>  
   </div>
    );
  }
}
export default TableRow;