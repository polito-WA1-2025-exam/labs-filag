import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react'

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
          <Button variant="light" onClick={handleLang}><i className="bi bi-translate"> {lang} </i></Button>
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

export function MyForm({text}) {
  const [order, setOrder] = useState("");  
  const [selectedBase, setSelectedBase] = useState(""); // Stato per la base selezionata
  const [options, setOptions] = useState([]); // Stato per le opzioni

  const handleSubmit = (event) => {  
    console.log('Order submitted');  
    event.preventDefault(); 
  } 
    
  const handleChange = (event) => {  
    setOrder(event.target.value) ; 
  };

  const handleBaseChange = (event) => {
    setSelectedBase(event.target.value); // Aggiorna lo stato con la base selezionata
  };


  useEffect(() => {
    // Recupera i dati dal database
    fetch('http://localhost:3000/api/options', {
      headers: {
      'Content-Type': 'application/json',
      },
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
      })
      .then((data) => setOptions(data))
      .catch((error) => console.error('Errore nel recupero dei dati:', error));
  }, []);



  return(
    <Form onSubmit={handleSubmit}>

      
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <h5>Choose your bowl size</h5>
          <Form.Check
            inline
            label="Regular"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Medium"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Large"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
          />
        </div>
      ))}


<label>Scegli una base</label>
      <select
        id="bowlBase"
        name="bowlBase"
        value={selectedBase}
        onChange={handleBaseChange}
      >
        <option value="" disabled>
          Seleziona una base
        </option>
        {options.map((option) => (
          <option key={option.IngredientId} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <br></br>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
