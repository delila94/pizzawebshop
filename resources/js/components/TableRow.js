import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import MyGlobleSetting from './MyGlobleSetting';


class TableRow extends Component {
  constructor(props) {
      super(props);
      this.state={qty:'',products:[],id:'',cart:[]}
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
      this.handleSubmit3 = this.handleSubmit3.bind(this);
      this.qty = this.qty.bind(this);
     this.id = this.id.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let uri = MyGlobleSetting.url + `/product/${this.props.obj.id}`;
    axios.delete(uri);
      browserHistory.push('/display-item');
  }
  handleSubmit2() {
    let uri = MyGlobleSetting.url + '/cart';
    return uri;
  }
 
    
  qty(e) {
    
    e.preventDefault()

      console.log(e.target.value);
      this.setState({qty:e.target.value});
   
      
    
  }
  id(e) {
    e.preventDefault()

      console.log(e.target.value);
      this.setState({id:e.target.value});
    
  }
  handleSubmit3(e,id) {

    e.preventDefault();
  axios.post('add',{qty:this.state.qty,
    id:id})
    .then(res=> {console.log(res.data); } );
  
   
}
handleSubmit4(e) {
  axios.get('clear') ;
  browserHistory.push('/display-item');

}
componentDidMount(){
  
  axios.get('product')
  .then(response => {
    this.setState({ products: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
  axios.get('total') 
  .then(response => {
     if(response.data==0)
    this.setState({ total: "Your cart is empty"});
else
this.setState({ total: "Cart is NOT empty."});
  })
  .catch(function (error) {
    console.log(error);
  })

}

/* <button className="btn-btn-secondary">
     <a href="http://localhost:8000/cart">Proceed to check out</a>
     </button>*/
     // <input type="text" value={if(this.state.total==0)></input>

  render() {
    return (
      
       <div className="container-fluid content-row">
         <div className="row justify-content-center">
         <div className="col-lg-24 d-flex align-items-stretch">
          <form onSubmit={this.handleSubmit3}>
            <h2>Our pizzas types:</h2>
             <input type="text" value={this.state.total}></input>
               <div className="row">
        {this.state.products.map(data=>

         <div className="card text-center ml-3 mt-3 mb-3 mr-3" key= {data.id}>

             <div className="card-header"><h4>{data.title}</h4>
             </div>
             <div className="card-body">
               <p>{data.body}</p>    
          Quantity;<input type="number" min="1" max="10"onChange={(e)=> this.qty(e)}></input><br></br><br></br>
          </div>
          <div className="card-footer">
          <button type="submit"  className="btn btn-primary" onClick={(e)=>{this.handleSubmit3(e,data.id);this.handleSubmit4;}}>Add to Cart</button>
          </div>

          </div> 
        )}
        <br></br>
       </div>  
      
     </form>
     </div>
     </div>
     <div className="row justify-content-center">

     <button className="btn btn-dark"><Link to="cartChosen">Proceed to Check Out</Link></button><br></br>
 
     </div>
   </div>
    );
  }
}


export default TableRow;