import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Custom.css";
import poke1 from "./Images/poke1.png";
import poke2 from "./Images/poke2.png";
import poke3 from "./Images/poke3.png";
export default function ImageSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={poke1} // Use the imported image
          alt="First slide"
        />
      </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={poke2} // Use the imported image
            alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={poke3} // Use the imported image
            alt="Third slide"
            />
        </Carousel.Item>
    </Carousel>
  );
}