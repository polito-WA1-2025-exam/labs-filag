import React, { useState, useEffect } from "react";
import { Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Custom.css";

export default function BuilderOrder() {
  const [dbList, setDbList] = useState({ Bowls: [], Bases: [], Proteins: [], Ingredients: [] }); // Initialize Bowls as an empty array
  const [selectedBase, setSelectedBase] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/show/All")
      .then((response) => response.json())
      .then((data) => {
        setDbList(data); // Update state with fetched data
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Container classname="container_dropdown">
      <div id="Bowls_Dropdown">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select a Bowl
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {dbList.Bowls.map((bowl) => (
              <Dropdown.Item key={bowl.id} onClick={() => setSelectedBase(bowl)}>
                {bowl.Name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div id="Bases_Div">

      </div>
      <div id="Proteins_div">

      </div>
      <div id="Ingredients_Div">

      </div>
    </Container>
  );
}