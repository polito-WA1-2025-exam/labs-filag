import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';

export function TextLinkExample () {
  return (
    <>
    <Navbar className="bg-body-tertiary" fixed = "top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
        <img
            src="./src/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Poke Logo"
        />
        {' '}Poke
        </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
    </>
  );
}

export function MyAccordion () {
  return (
    <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>R - regular size</Accordion.Header>
        <Accordion.Body>
          1 protein - 4 ingredients - base price: 9.00
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>M - medium size</Accordion.Header>
        <Accordion.Body>
          2 protein - 4 ingredients - base price: 11.00
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>L - large size</Accordion.Header>
        <Accordion.Body>
          2 protein - 6 ingredients - base price: 14.00
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}

export function MyButton (props) {
  let [english, setEnglish] = useState (true) ;

  return (<Button style={{ marginTop: '20px' }} onClick={ () => setEnglish (e => !e)}>
    {english ? 'Sav Casansss' : 'Savio Casano'}
  </Button>);
}

export function MyForm (props) {
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    console.log('Name submitted: ' + name);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setName(event.target.value) ;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
/*
  return <form onSubmit={handleSubmit}>
      <label> Name:
      <input type="text" value={name}
      onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form> ;*/
}