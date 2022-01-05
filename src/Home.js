import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
    <nav>
      <Link to="/twos">Two Letter Words</Link>
      <Link to="/two-hooks">Two Letter Hooks</Link>
      <Link to="/short-jqxz">Unscramble Short J/Q/X/Z Words</Link>
      <Link to="/power-stems">Power Bingo Stems</Link>
      <Link to="/credits">Credits</Link>
    </nav>
    </div>

  )
}
export default Home;
