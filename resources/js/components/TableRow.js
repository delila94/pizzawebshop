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
    alert("Pizza added to cart!");
  
   
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

}

/* <button className="btn-btn-secondary">
     <a href="http://localhost:8000/cart">Proceed to check out</a>
     </button>*/
     // <input type="text" value={if(this.state.total==0)></input>
     

  render() {
    return (
      
       <div className="container-fluid content-row">
         
          <form onSubmit={this.handleSubmit3}> 
            <h2>Our pizzas types:</h2>

             <div className="row justify-content-center">
             {this.state.products.map(data=>
              <div className="col-sm-3">
             <div class="card mt-2" key={data.id} >
  <div class="card-body">
    <h5 class="card-title">{data.title}</h5>
    <p>{data.body}</p>
    <p class="card-text"> Quantity;<input type="number" min="1" max="10"onChange={(e)=> this.qty(e)}></input></p>
     
    <button type="submit"  className="btn btn-primary" onClick={(e)=>this.handleSubmit3(e,data.id)}>Add to Cart</button>
    </div>
    </div>
    </div>
)}


</div>
</form>
     <div className="row justify-content-center">

     <button className="btn btn-dark"><Link to="cartChosen">Proceed to Check Out</Link></button><br></br>
 
     </div>
     
   </div>
    );
  }
}


export default TableRow;