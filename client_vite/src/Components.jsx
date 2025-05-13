import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useState, useEffect, use } from 'react'

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

  const [bases, setBases] = useState([]); // Stato per le basi
  const [ingredients, setIngredients] = useState([]); // Stato per gli ingredienti
  const [proteins, setProteins] = useState([]); // Stato per gli ingredienti

  const [option, setOptions] = useState(""); // Stato per le opzioni grandezza bowl
  const [selectedBase, setSelectedBase] = useState(""); // Stato per la base selezionata
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Stato per gli ingredienti selezionati
  const [selectedProteins, setSelectedProteins] = useState([]); // Stato per le proteine selezionate
  const [price, setPrice] = useState(0); // Stato per il prezzo

  const [isSuccess, setSuccess] = useState(""); 

  const handleSubmit = (event) => {  

    event.preventDefault();

    fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        option,
        selectedBase,
        selectedIngredients,
        selectedProteins,
        price
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("ok"); 
      })
      .catch((error) => {
        setSuccess("error");
      });

  } 
    
  const handleChange = (event) => {  
    setOrder(event.target.value) ; 
  };

  const handleOptionsChange = (event) => {
    const value = event.target.value;
    setOptions(value); 
  }

  const handleBaseChange = (event) => {
    const value = event.target.value;
    setSelectedBase(value); // Aggiorna lo stato con la base selezionata
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
      .then((data) => setBases(data))
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
  }, []); // Effettua la chiamata API al caricamento del componente, all'inizio


  useEffect(() => {

    console.log("Selected Proteins: ", selectedProteins);
    console.log("Selected Ingredients: ", selectedIngredients);
    var tot = 0;

    if (option === "Regular"  && (selectedProteins.length > 1 && selectedIngredients.length > 3)) {
        const extra = selectedProteins.length - 1 + selectedIngredients.length - 3;
        const extraCost = (9 * 0.2) * extra; 
        tot = 9 + extraCost;
      } else if (option === "Regular" && (selectedProteins.length <= 1 && selectedIngredients.length <= 3)) {
        tot = 9;
      } else if (option === "Regular"  && (selectedProteins.length <= 1)) {
        const extra = selectedIngredients.length - 3;
        const extraCost = (9 * 0.2) * extra; 
        tot = 9 + extraCost;
      } else if (option === "Regular" && (selectedIngredients.length <= 3)) {
        const extra = selectedProteins.length - 1;
        const extraCost = (9 * 0.2) * extra; 
        tot = 9 + extraCost;
      }

      else if (option === "Medium" && (selectedProteins.length > 1 && selectedIngredients.length > 3)) {
        const extra = selectedProteins.length - 1 + selectedIngredients.length - 3;
        const extraCost = (11 * 0.2) * extra; 
        tot = 11 + extraCost;
      } else if (option === "Medium" && (selectedProteins.length <= 1 && selectedIngredients.length <= 3)) {
        tot = 11;
      } else if (option === "Medium" && (selectedProteins.length <= 1)) {
        const extra = selectedIngredients.length - 3;
        const extraCost = (11 * 0.2) * extra; 
        tot = 11 + extraCost;
      } else if (option === "Medium" && (selectedIngredients.length <= 3)) {
        const extra = selectedProteins.length - 1;
        const extraCost = (11 * 0.2) * extra; 
        tot = 11 + extraCost;
      }
      
      else if (option === "Large" && (selectedProteins.length > 2 && selectedIngredients.length > 4)) {
        const extra = selectedProteins.length - 2 + selectedIngredients.length - 4;
        const extraCost = (14 * 0.2) * extra; 
        tot = 14 + extraCost;
      } else if (option === "Large" && (selectedProteins.length <= 2 && selectedIngredients.length <= 4)) {
        tot = 14;
      } else if (option === "Large" && (selectedProteins.length <= 2)) {
        const extra = selectedIngredients.length - 4;
        const extraCost = (14 * 0.2) * extra; 
        tot = 14 + extraCost;
      } else if (option === "Large" && (selectedIngredients.length <= 4)) {
        const extra = selectedProteins.length - 2;
        const extraCost = (14 * 0.2) * extra; 
        tot = 14 + extraCost;
      }

      setPrice(tot); 

  }, [option, selectedProteins, selectedIngredients]);


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
                value="Regular"
                type={type}
                id={`inline-${type}-1`}
                onChange={handleOptionsChange}
              />
              <Form.Check
                inline
                label="Medium"
                name="group1"
                value="Medium"
                type={type}
                id={`inline-${type}-2`}
                onChange={handleOptionsChange}
              />
              <Form.Check
                inline
                label="Large"
                name="group1"
                value="Large"
                type={type}
                id={`inline-${type}-3`}
                onChange={handleOptionsChange}
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
            {bases.map((selectedBase) => (
              <option key={selectedBase.IngredientId} value={selectedBase.IngredientId}>
                {selectedBase.name}
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
                  value={protein.IngredientId}
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
                  value={ingredient.IngredientId}
                  onChange={handleIngredientChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='form-items'>
          <h1>Price</h1><h5>${price}</h5>
        </div>

        <br />


        <div className='inline-custom'>
        <Button variant="success" type="submit">
          Submit
        </Button>

        { isSuccess === "ok" && (
          <Card bg={'success'} key={'success'} text='light' className='text-card'>
            <Card.Body>
              <Card.Text>
                Bowl created successfully, thank you for your order!
              </Card.Text>
            </Card.Body>
          </Card>
        )} 
        { isSuccess === "error" && (
          <Card bg={'danger'} key={'error'} text='light' className='text-card' >
            <Card.Body>
              <Card.Text>
                Error creating bowl, please try again.
              </Card.Text>
            </Card.Body>
          </Card>
        )} 
        </div>

      </Form>


      </Card.Body>
    </Card>
    
  );
}
