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
  const [ingredients, setIngredients] = useState([]); // Stato per gli ingredienti
  const [proteins, setProteins] = useState([]); // Stato per gli ingredienti
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Stato per gli ingredienti selezionati
  const [selectedProteins, setSelectedProteins] = useState([]); // Stato per le proteine selezionate

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

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedIngredients((prev) => [...prev, value]); // Aggiungi l'ingrediente selezionato
    } else {
      setSelectedIngredients((prev) => prev.filter((item) => item !== value)); // Rimuovi l'ingrediente deselezionato
    }
  };

  const handleProteinChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedProteins((prev) => [...prev, value]); // Aggiungi l'ingrediente selezionato
    } else {
      setSelectedProteins((prev) => prev.filter((item) => item !== value)); // Rimuovi l'ingrediente deselezionato
    }
  };


  useEffect(() => {

    // Recupera opzioni base
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


    // Recupera gli ingredienti
    fetch('http://localhost:3000/api/ingredients', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Errore nel recupero degli ingredienti:', error));


      // Recupera le proteine
    fetch('http://localhost:3000/api/proteins', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProteins(data))
      .catch((error) => console.error('Errore nel recupero delle proteine:', error));
  }, []);



  return(
    <Card className='form-card'>
      <Card.Body>

        <Form onSubmit={handleSubmit}>
        <div className='form-items'>
          <h5>Choose your bowl size</h5>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
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

        </div>


        <div className='form-items'>
          <h5>Choose a base</h5>
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
        </div>

        <div className='form-items'>
          <h5>Choose your proteins</h5>
          <div className="mb-3">
            {proteins.map((protein) => (
              <div key={protein.IngredientId} className="inline-custom">
                <Form.Check
                  type="checkbox"
                  label={protein.name}
                  value={protein.name}
                  onChange={handleProteinChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='form-items'>
          <h5>Choose your ingredients</h5>
          <div className="mb-3">
            {ingredients.map((ingredient) => (
              <div key={ingredient.IngredientId} className="inline-custom">
                <Form.Check
                  type="checkbox"
                  label={ingredient.name}
                  value={ingredient.name}
                  onChange={handleIngredientChange}
                />
              </div>
            ))}
          </div>
        </div>


        <br></br>
        

        <Button variant="success" type="submit">
          Submit
        </Button>


      </Form>


      </Card.Body>
    </Card>
    
  );
}
