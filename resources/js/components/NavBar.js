import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { hashHistory } from 'react-router';
import { getProfile } from './UserFunctions'
class NavBar extends Component {
  constructor(props) {
    super(props);
    super();
   
  this.state = {
    loggedIn:false,
    errors:[],
    show:false,
    login:false,
    name:'',
    email:'',
    counter:'',
 
  };
  this.handleMe=this.handleMe.bind(this);
  this.handleModalClose=this.handleModalClose.bind(this);
}
componentDidMount(){
    let critical = JSON.parse(localStorage.getItem('loginVar')) //is user loggedIn true false boolean
    this.setState({
        login: critical
    },()=>{  if(this.state.login==true) {
        getProfile().then(res => {
            this.setState({
                name: res.user.name,
                email: res.user.email
            })
           
        })
    } 
    else {
        this.setState({
            name: 'Guest',
            email: 'Guest'
        })
    }   })  
   // let count = localStorage.getItem('counter') //is user loggedIn true false boolean
   // this.setState({
   //     counter: count },()=>{console.log("od countera",this.state.counter)})
    
}
handleMe(e){
    //e.preventDefault();
    axios.post('api/logout')
    .then(res=> {
    this.setState({try: Object.values(res.data), show:true},()=>{ localStorage.setItem('email', 'Guest'),localStorage.setItem('loginVar',false)})
   
    }) 
    .catch(error=> {
        this.setState({ errors: error.response.data,show:false});
        
      }); 
}
handleModalClose() {
    this.setState({show: !this.state.show});  
  }
  handleGo(e)
   {
    hashHistory.push('/');
   // window.location.reload(false);
   }
  render(){
      
    return (
      <div >
           <Modal id="#loggedOutSuccess" show={this.state.show} onHide={()=>{this.handleModalClose()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body className="row justify-content-center" >       
    <p style={{margin:"10px", fontSize:"20px"}}> You are logged out</p></Modal.Body>
        </Modal>
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
<nav className="navbar navbar-expand-lg navbar-light" style={{color:"white" ,backgroundColor:"#313184"}}>
<a className="navbar-brand" style={{color:"white"}} href="/">Pizza Yummi</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" style={{color:"white"}} href="/">Home  <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" style={{color:"white"}} href="#/display-item">Order Online</a>
      </li>
    </ul>
    <div className="form-inline my-2 my-lg-0">
  <a className="nav-item nav-link" style={{color:"white"}} href="#/cartChosen"><i style={{fontSize:"45px"}} className="material-icons">shopping_cart</i></a>
  <a className="nav-link" style={{color:"white"}} href="/#/register">Register <span className="sr-only">(current)</span></a>              
                { this.state.login
                    ? <div className="form-inline my-2 my-lg-0">
                        <a className="nav-link" style={{color:"white"}} href="" onClick={(e)=>{this.handleMe(e)}}>Logout<span className="sr-only">(current)</span></a> 
                        <a className="nav-link" style={{color:"white"}} href="#/profile">Profile</a>
                        </div>
                    : <a className="nav-link" style={{color:"white"}} href="/#/login">Login<span className="sr-only">(current)</span></a>
  
                }
            
    <a type="text" className="nav-link" style={{color:"white"}} >{this.state.name}<span className="sr-only">(current)</span></a>
   <p>{this.state.login}</p>
   </div>
  </div>
</nav>
      </div>

    )
  }
}
export default NavBar;