import React ,{useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="navbar-section">
      <Link className="navbar-brand" to="/">E-commerce</Link>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : 'd-none'}`}>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" onClick={closeMobileMenu}>
          <div className="cart-container">
           <span className="cart-count">{cartItemCount}</span>
          Cart
           </div>
           </Link>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
