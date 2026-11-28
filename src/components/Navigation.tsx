import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="adwaita-navigation">
      <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
        Home
      </Link>
      <Link to="/repos" className={`nav-link${location.pathname.startsWith('/repos') ? ' active' : ''}`}>
        Repositories
      </Link>
    </nav>
  );
}
