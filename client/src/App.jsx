import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MyNavbar from './CustomComponents/Navbar.jsx';
import ImageSlider from './CustomComponents/image_slider.jsx';
import BuilderOrder from './CustomComponents/BuilderOrder.jsx';
import './App.css';

function Home() {
  return (
    <div>
      <h1>Poke activity RoAR</h1>
      <ImageSlider />
      <Button variant="primary" as={Link} to="/order">
        Go to Another Page
      </Button>
    </div>
  );
}

function Price()
{
  return (<>
    <h1>Pricing</h1>
    <p>Check out our competitive pricing!</p> 
  </>);
}

function Order() {
  return (
    <div>
      <h1>Welcome to Another Page</h1>
      <BuilderOrder />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order/>} />
        <Route path="/prices" element={<Price />} />
      </Routes>
    </Router>
  );
}

export default App;