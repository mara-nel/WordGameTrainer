import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
    <nav>
      <Link to="/twos">
        <span className="tile">T</span>
        wo Letter Words</Link>
      <Link to="/two-hooks">
        <span className="tile">H</span>
        ooks of Two Letter Words</Link>
      <Link to="/short-jqxz">
        <span className="tile">U</span>
        nscramble Short J/Q/X/Z Words</Link>
      <Link to="/power-stems">
        <span className="tile">P</span>
        ower Bingo Stems</Link>
      <Link to="/credits">
        <span className="tile">C</span>
        redits</Link>
    </nav>
    </div>

  )
}
export default Home;
