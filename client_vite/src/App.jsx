import { useState } from 'react'
import {NavBar, TypesExample, CarouselPoke, MyCard} from './Components.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <NavBar></NavBar>
      <CarouselPoke></CarouselPoke>
      <div className='card-container'>
        <MyCard img="1" title="Regular Bowl" text="9€"></MyCard>
        <MyCard img="2" title="Medium Bowl" text="11€"></MyCard>
        <MyCard img="3" title="Large Bowl" text="14€"></MyCard>
      </div>
      </div>
    </>
  )
}

export default App
