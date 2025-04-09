import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import './App.css';



export function NavBar({lang, handleLang, text}) {
  return (
    <>
      <Navbar className='navbar-custom' >
        <Container>
          <Navbar.Brand href="#home">{text.title}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#ingredients">{text.ingredients}</Nav.Link>
            <Nav.Link href="#pricing">{text.prices}</Nav.Link>
          </Nav>
          <Button variant="light" onClick={handleLang}><i class="bi bi-translate"> {lang} </i></Button>
        </Container>
      </Navbar>
    </>
  );
}


export function CarouselPoke({ text }) {

  return (
    <Carousel className="carousel-custom">
      {text.map((slide, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={slide.img} alt={`Slide ${index + 1}`} />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export function MyCard({text}) {
  return (
    <div className='card-container'>
      {text.map((card, index) => (
        <Card key={index} className='card-custom'>
          <Card.Img variant="top" src={card.img} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.price}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export function Footer({text}) {
  return (
    <footer className="footer-custom">
      <span> {text.group} </span>
      <span>{text.footer}</span>
    </footer>
  );
}

export function Title({text}) {
  return (
    <div className="title-custom">
        <h1 >{text.introQuestion}</h1>
        <p >{text.introDescription}</p>
    </div>
  );
}
