import './App.css';
import Home from './Home';
import PowerStems from './PowerStems';
import Credits from './Credits';
import Twos from './Twos';
import TwoHooks from './TwoHooks';
import ShortJQXZs from './ShortJQXZs';


import { Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1><Link to="/">
        <span><span className="tile">W</span>ord </span>
        <span><span className="tile">G</span>ame </span>
        <span><span className="tile">T</span>rainer </span>
      </Link></h1>
      <div className="content">
        <Routes>
          <Route path="/credits" element={<Credits />}/>
          <Route path="/power-stems" element={<PowerStems />}/>
          <Route path="/twos" element={<Twos />}/>
          <Route path="/two-hooks" element={<TwoHooks />}/>
          <Route path="/short-jqxz" element={<ShortJQXZs />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
