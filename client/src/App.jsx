import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TextLinkExample, MyAccordion, MyButton, MyForm} from './components.jsx';

function App() {
  return (
    <>
      <TextLinkExample/>
      <h3>Choose your bowl size:</h3>
      <MyAccordion/>
      <MyButton/>
      <MyForm/>
    </>
  )
}

export default App
