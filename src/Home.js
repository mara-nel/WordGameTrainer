import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
    <nav>
      <Link to="/power-stems">Power Stems</Link>
      <Link to="/credits">Credits</Link>
    </nav>
    </div>

  )
}
export default Home;
