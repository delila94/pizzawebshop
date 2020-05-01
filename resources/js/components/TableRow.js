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
  handleGo(e)
   {
    hashHistory.push('/cartChosen');
   }
 
  qty(e)
   {
    e.preventDefault()
    this.setState({qty:e.target.value});     
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
      id:id})
      .then(res=> {console.log(res.data); } );
    alert("Pizza added to cart!"); 
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
}
  render() {

    let array = ["4", "1", "2", "3", "0", "5", "6", "7"];
    let images = array.map(image => {
    return <img key={image} src={require(`./${image}.jpg`)} style={{width:"100%", height:"auto"}} alt="" className="img-responsive" />
    });

    return (
      
  <div className="container">
      <h2 style={{margin:"10px"}}>Our pizzas types:</h2>
      <div className="row justify-content-center mb-5">
            <button className="btn btn-dark btn-lg" type="button" style={{color:"white"}} onClick={(e)=>this.handleGo()}>See Your Cart</button>
      </div>
         <div className="row justify-content-center">
             {this.state.products.map((data,mykey)=>
          <div className="col-lg 6 col-md-6 col-sm-12 col-xs-12"  key={mykey}>
            <div className="card mb-4 ml-2 mr-2" style={{width: "320px"}}  >
              <p className="card-img-top " alt="Card image cap" >{ images[mykey] }</p>
               <div className="card-body  ">
                <h3 className="card-title row justify-content-center" style={{fontWeight:"bold"}}>{data.title}</h3>
                <p className="row justify-content-center">{data.body}</p>
                <p className="row justify-content-center" style={{fontWeight:"bold"}}>Price:{data.price}$ </p>
                <p className="row justify-content-center" style={{fontWeight:"bold"}}>Price:{Math.floor(data.price*0.92 * 100) / 100}€ </p>
                <p className="card-text row justify-content-center"> Quantity:  <input type="number" min="1" max="10" onChange={(e)=> this.qty(e)}></input></p>
                <div className="row justify-content-center">
                <button type="submit"  className="btn btn-primary" onClick={(e)=>this.handleSubmit3(e,data.id)}>Add to Cart</button>
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