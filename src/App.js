import './App.css';
import Home from './Home';
import PowerStems from './PowerStems';
import Credits from './Credits';
import Twos from './Twos';

import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1><Link to="/">Word Game Trainer</Link></h1>
      <div className="content">
        <Routes>
          <Route path="/credits" element={<Credits />}/>
          <Route path="/power-stems" element={<PowerStems />}/>
          <Route path="/twos" element={<Twos />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
