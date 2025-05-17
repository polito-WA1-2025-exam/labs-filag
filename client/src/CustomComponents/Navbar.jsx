import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Custom.css";

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom_navbar">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand >Poke App</Navbar.Brand>

        {/* Navbar Toggle for Responsive Layout */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/order">Order a Poke</Nav.Link>
            <Nav.Link href="/prices">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}