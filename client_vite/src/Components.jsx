import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import slide1 from './assets/images/Poke1.jpg';
import slide2 from './assets/images/Poke2.jpeg';
import slide3 from './assets/images/Poke3.jpg';
import './App.css';

export function NavBar() {
  return (
    <>
      <Navbar className='navbar-custom' data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="#home">Poke House</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">Ingredients</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export function TypesExample() {
  return (
    <>
      <Button variant="primary">Primary</Button>
    </>
  );
}


export function CarouselPoke() {
  return (
    <Carousel className="carousel-custom">
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="First slide"/>
        <Carousel.Caption>
          <h3>Time for a Bowl?</h3>
          <p>Choose from the many available ingredient options</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="Second slide"/>
        <Carousel.Caption>
          <h3>Try the bowl of the month</h3>
          <p>Venere rice, salmon, edamame, tuna sauce, and cashews</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="Third slide"/>
        <Carousel.Caption>
          <h3>Student discount</h3>
          <p> 20% discount on all bowls if you're a university student</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export function MyCard({img, title, text}) {
  const imageSrc = img === '1' ? slide1 : img === '2' ? slide2 : slide3;

  return (
    <Card className='card-custom'>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}