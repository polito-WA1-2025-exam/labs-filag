import { useState } from 'react'
import {NavBar, CarouselPoke, MyCard, Footer, Title} from './Components.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  const [language, setLang] = useState("IT")

  const handleLang = () => {
    if (language == "IT") {
      setLang("EN")
    } else {
      setLang("IT")
    }
  }

  return (
    <>
      <div>
      <NavBar lang = {language} handleLang={handleLang}></NavBar>
      <CarouselPoke></CarouselPoke>
      <Title></Title>
      <div className='card-container'>
        <MyCard img="1" title="Regular Bowl" text="9€"></MyCard>
        <MyCard img="2" title="Medium Bowl" text="11€"></MyCard>
        <MyCard img="3" title="Large Bowl" text="14€"></MyCard>
      </div>
      <Footer></Footer>
      </div>
    </>
  )
}

export default App
