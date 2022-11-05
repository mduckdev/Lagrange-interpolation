import './App.css';
import { Cards } from "./components/Cards.component"
import { Plus } from "./components/AddCard.component"
import { useState } from 'react';
function App() {
  const [xPoints, setXPoint] = useState<number[]>([]);
  const [yPoints, setYPoint] = useState<number[]>([]);
  return (
    <div className="App">
      <div className='card-container'>
        <Cards></Cards>
        <button className='submitButton'>OBLICZ</button>
      </div>
    </div>
  );
}

export default App;
