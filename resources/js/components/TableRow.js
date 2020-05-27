import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';
import NavBar from './NavBar';
import FootBar from './FootBar';

class TableRow extends Component {
  constructor(props) {
      super(props);
      super();
     
      this.state={qty:'1',qtyDisp:'1',isLoading:true,email:'',Oneproduct:[],counter:0,products:[],id:'',cart:[], show: false}
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.qty = this.qty.bind(this);
      this.id = this.id.bind(this);
      this.handleGo = this.handleGo.bind(this);
      this.handleModal = this.handleModal.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
      
  }

  handleGo(e)
   {
    hashHistory.push('/cartChosen');
   }
 
  qty(e)
   {
    e.preventDefault()
      this.setState({qty:e.target.value}); 
    this.setState({qtyDisp:e.target.value});  
     
  }
  id(e) 
  {
    e.preventDefault();
    this.setState({id:e.target.value});   
  }

  handleSubmit3(e,id)
   {
    e.preventDefault();
    axios.post('add',{qty:this.state.qty,
      id:id,email:this.state.email})
    
      this.setState({counter:this.state.counter+parseInt(this.state.qty)},()=>{ localStorage.setItem('counter',this.state.counter+parseInt(this.state.qty))});
     
    // this.setState({counter:this.state.counter+parseInt(this.state.qty)}, ()=>{this.props.functionCallFromParent(this.state.counter)});
    if(this.state.qty==1) {this.setState({qtyDisp:'1'});}
    this.setState({qty:'1'});
    this.handleModal(id);
}
     
componentDidMount()
{
  axios.get('product')
  .then(response => {
    this.setState({ products: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
  setTimeout(() => this.setState({isLoading: false}), 1000);
  let criticalData = localStorage.getItem('email')
    this.setState({
        email: criticalData
    })

}
handleModal(id) {
  this.setState({show: !this.state.show});
   let prod=Object.values(this.state.products[id-1]);
   this.setState({Oneproduct:prod}
   ); 
    
}
handleModalClose() {
  this.setState({show: !this.state.show});  
}
  render() {
    if(this.state.isLoading){
      return(
        <div className="row justify-content-md-center"><img src={require('./logo.png') } className="App-logo"/> <img src={require('./white.jpg') } className="App-logo"/> </div>
     
        )
    }

    let array = [ "1", "2", "3", "4", "5", "6", "7","8","9","10","11","12"];
    let images = array.map(image => {
    return <img key={image} src={require(`./${image}.png`)} style={{width:"70%", height:"auto"}} alt="" className="img-responsive" />
    });
    return (
      <div><NavBar/>
  <div className="container">
       <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
       <Modal id="#addedToCart" show={this.state.show} onHide={()=>{this.handleModalClose()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body className="row justify-content-center" >       
    <p style={{width:"150px"}}>{ images[this.state.Oneproduct[0]-1] }</p>
    <p style={{margin:"10px", fontSize:"20px"}}> {this.state.qtyDisp} {this.state.Oneproduct[1]} added to your cart!</p></Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.handleModalClose()}}>Continue Shopping</Button>
            <Button  onClick={()=>{this.handleGo()}}>Go to cart</Button>
          </Modal.Footer>
        </Modal>
        
    <h2 style={{margin:"10px"}}>Menu:</h2>
         <div className="row justify-content-center">
             {this.state.products.map((data,mykey)=>
          <div className="col-lg 6 col-md-6 col-sm-12 col-xs-12"  key={mykey}>
            <div className="card mb-4 ml-2 mr-2 " style={{width: "260px"}}  >

            <div className="card-image" >
                            <p> { images[mykey] }</p>
                            <h5 style={{margin:"10px"}} className="card-title"><b>{data.title}</b></h5>
                        </div>
                        <div style={{margin:"9px"}} className="card-content">
                            <p>{data.body}</p>
                            <div className="row justify-content-center">
                            <p><b>Price: {data.price}$ ({Math.floor(data.price*0.92 * 100) / 100}€)</b></p>
                            </div>
                            
                            <div  style={{margin:"5px"}} > 
                            Quantity: 
                            <select style={{margin:"10px"}} onChange={(e)=> {this.qty(e)}}>
                            <option default value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                             </select>
                             
                              <button type="submit" style={{width:"40%", marginTop:"7px",color:"#313184"}} className="btn" onClick={(e)=>{this.handleSubmit3(e,data.id)}}><i style={{fontSize:"40px"}} className="material-icons">add_shopping_cart</i></button>
                             </div>
                        </div>
           </div>
         </div>   
            )}
        </div>  
   </div>
   <FootBar/>
   </div>
    );
  }
}
export default TableRow;