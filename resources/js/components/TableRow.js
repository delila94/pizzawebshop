import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
      super(props);
      this.state={qty:'1',products:[],id:'',cart:[]}
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.qty = this.qty.bind(this);
     this.id = this.id.bind(this);
     this.handleGo = this.handleGo.bind(this);
     
  }
  handleGo(e) {
   
    hashHistory.push('/cartChosen');
    
   
 
 }
 
  
  qty(e) {
    
    e.preventDefault()

     //  console.log(e.target.value);
      this.setState({qty:e.target.value});  
    
  }
  id(e) {
    e.preventDefault()

    //   console.log(e.target.value);
      this.setState({id:e.target.value});
    
  }
  handleSubmit3(e,id) {

    e.preventDefault();
    axios.post('add',{qty:this.state.qty,
      id:id})
      .then(res=> {console.log(res.data); } );
      alert("Pizza added to cart!");
 
  
   
}

componentDidMount(){
  
  axios.get('product')
  .then(response => {
    this.setState({ products: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
  

}


  render() {
    let array = ["4", "1", "2", "3", "0", "5", "6", "7"];

    let images = array.map(image => {
       return <img key={image} src={require(`./${image}.jpg`)} style={{width:"100%", height:"auto"}} alt="" className="img-responsive" />
    });
    return (
      
       <div className="container">
         
          <form onSubmit={this.handleSubmit3}> 
            <h2>Our pizzas types:</h2>

             <div className="row justify-content-center">
             {this.state.products.map((data,mykey)=>
              <div className="col-lg 6 col-md-6 col-sm-12 col-xs-12"  key={mykey}>
             <div className="card mb-4 ml-2 mr-2" style={{width: "320px"}}  >
             <p className="card-img-top" alt="Card image cap" >{ images[mykey] }</p>
  <div className="card-body justify-content-center ">
    <h4 className="card-title">{data.title}</h4>
    <p>{data.body}</p>
    <p style={{fontWeight:"bold"}}>Price:{data.price}$ </p>
    <p style={{fontWeight:"bold"}}>Price:{Math.floor(data.price*0.92 * 100) / 100}€ </p>
    <p className="card-text"> Quantity:  <input type="number" min="1" max="10" onChange={(e)=> this.qty(e)}></input></p>
    <button type="submit"  className="btn btn-primary" onClick={(e)=>this.handleSubmit3(e,data.id)}>Add to Cart</button>
    </div>
    </div>
    </div>
    
)}


</div>
</form>
     <div className="row justify-content-center">

     <button className="btn btn-dark" type="button" style={{color:"white"}} onClick={(e)=>this.handleGo()}>Proceed to Check Out</button><br></br>
 
     </div>
     
   </div>
    );
  }
}


export default TableRow;