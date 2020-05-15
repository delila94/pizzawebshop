import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
class HomePizza extends Component {
  
  render(){
    /*const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };*/
    return (
    
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ require('./pizza3.jpg') }
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Welcome to Pizza Yummi</h1>
          <h3>To order pizza click on "Order Online"</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ require('./pizza4.jpg') }
          alt="Third slide"
        />
    
        <Carousel.Caption>
          <h3>Choose best pizza in town, with quick delivery</h3>
          <p>We are delivering through all country</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ require('./pizza5.jpg') }
          alt="Third slide"
        />
    
        <Carousel.Caption>
          <h3>Quality is our #1 ingredient. That’s why our pizzas are the best</h3>
          <p>Always the best food, made especially for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
  }
}
export default HomePizza;