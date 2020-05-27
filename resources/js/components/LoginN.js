import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import axios from 'axios';
import {Button, ButtonToolbar, Modal,Form} from 'react-bootstrap'; 
class LoginN extends Component {
  constructor(props) {
    super(props);
    super();
    this.handleForm = this.handleForm.bind(this);
    this.state={username:'',password:'',isChecked:false}

}

handleForm (e)
{
e.preventDefault();
console.log(this.state.isChecked,this.state.username);
}
handleChecked(e){
  e.preventDefault();
     this.setState({isChecked: !this.state.isChecked});
}

  render(){
    const {username,password,isChecked}=this.state;
    return (
      <div>
      <Form onSubmit={(e)=>{this.handleForm(e)}}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter usernamae" value={username} onChange={e=>this.setState({username: e.target.value})} />
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e=>this.setState({password: e.target.value})} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check checked={isChecked} type="checkbox" label="Check me out" onChange={(e)=>{this.handleChecked(e)}} />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </div>
    )
  }
}
export default LoginN;