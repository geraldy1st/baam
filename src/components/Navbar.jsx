import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/baam" className="logo">
          BAAM
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/baam">Accueil</Link>
          </li>
          <li>
            <Link to="/about">À propos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
