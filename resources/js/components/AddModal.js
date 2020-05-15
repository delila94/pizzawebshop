import React, { Component } from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
export class AddModal extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
            <Modal id="#addedToCart" show={this.state.show} onHide={()=>{this.handleModal()}}>
          <Modal.Header closeButton> Pizza Yummi</Modal.Header>
          <Modal.Body> Pizza Added Successfully to cart!</Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.handleModal()}}>Continue Shopping</Button>
            <Button onClick={()=>{this.handleGo()}}>See Your Cart</Button>
          </Modal.Footer>
        </Modal>
        </div>
        );
    }
}
export default AddModal;