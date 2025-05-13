import { useState } from 'react'
import {NavBar, CarouselPoke, MyCard, MyForm, Footer, Title} from './Components.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import IngredientsPage from './IngredientsPage.jsx';
import './App.css'

import slide1 from './assets/images/Poke1.jpg';
import slide2 from './assets/images/Poke2.jpeg';
import slide3 from './assets/images/Poke3.jpg';


function App() {
  const [language, setLang] = useState("EN")

  const handleLang = () => {
    if (language == "IT") {
      setLang("EN")
    } else {
      setLang("IT")
    }
  }

  // Function to handle language change
  const translations = {
    IT: {
      title: "Casa del Poke",
      ingredients: "Ingredienti",
      prices: "Prezzi",
      footer: "© 2025 Casa del Poke",
      group: "FilaG Spa",
      carousel: [
        {
          title: "Tempo per una Bowl?",
          description: "Scegli tra le tante opzioni di ingredienti disponibili",
          img: slide3,
        },
        {
          title: "Prova la bowl del mese",
          description: "Riso venere, tonno, edamame, salsa tonnata e anacardi",
          img: slide2,
        },
        {
          title: "Sconto studenti",
          description: "Sconto del 20% su tutte le ciotole se sei uno studente universitario",
          img: slide1,
        },
      ],
      introQuestion: "Scegli la dimensione della tua bowl",
      introDescription: "Seleziona una delle seguenti dimensioni e poi scegli i tuoi ingredienti personali dalla nostra proposta",
      cards: [
        {
          title: "Bowl normale",
          price: "9€",
          img: slide1,
        },
        {
          title: "Bowl media",
          price: "11€",
          img: slide2,
        },
        {
          title: "Bowl grande",
          price: "14€",
          img: slide3,
        },
      ],
    },
    EN: {
      title: "Poke House",
      ingredients: "Ingredients",
      prices: "Prices",
      group: "RowG Spa",
      footer: "© 2025 Poke House",
      carousel: [
        {
          title: "Time for a Bowl?",
          description: "Choose from the many available ingredient options",
          img: slide3,
        },
        {
          title: "Try the bowl of the month",
          description: "Venere rice, tuna, edamame, tuna sauce, and cashews",
          img: slide2,
        },
        {
          title: "Student discount",
          description: "20% discount on all bowls if you're a university student",
          img: slide1,
        },
      ],
      introQuestion: "Choose your bowl size",
      introDescription: "Select one of the following size and then select your personal ingredients from our proposal",
      cards: [
        {
          title: "Regular Bowl",
          price: "9€",
          img: slide1,
        },
        {
          title: "Medium Bowl",
          price: "11€",
          img: slide2,
        },
        {
          title: "Large Bowl",
          price: "14€",
          img: slide3,
        },
      ],
      
    },
  };



  return (
    <>
      <div>
      <NavBar lang = {language} handleLang={handleLang} text={translations[language]}></NavBar>
      <Routes>
        <Route path="/"  />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
      <CarouselPoke text={translations[language].carousel}></CarouselPoke>
      <Title text={translations[language]}></Title>
      <div className='card-container'>
        <MyCard text={translations[language].cards}></MyCard>
      </div>
      <MyForm text={translations[language]}></MyForm>
      <Footer text={translations[language]}></Footer>
      </div>
    </>
  )
}

export default App
