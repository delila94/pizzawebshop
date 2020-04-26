import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import MyGlobleSetting from './MyGlobleSetting';
class DisplayProduct extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', products: ''};
     }
     componentDidMount(){
       axios.get('http://localhost:8000/api/products')
       .then(response => {
         this.setState({ products: response.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     tabRow(){
      if(this.state.products instanceof Array){
         return this.state.products.map(function(object, i){
          return <TableRow obj={object} key={i} />;

         })
       }
      
     }


  render(){
    return (


      <div>
        <h1>Choose pizzas from our menu:</h1>



        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Pizza Title</td>
                <td>Pizza Description</td>
                <td>Price $</td>
                <td width="200px">Actions</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
      
          
              <button className="btn btn-dark"><Link to="display-chosen-products">Proceed to Check Out</Link></button>
              
          
    </div>
    )
  }
}
export default DisplayProduct;