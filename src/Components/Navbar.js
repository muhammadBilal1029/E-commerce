import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="navbar-section">
      <Link className="navbar-brand" to="/">E-commerce</Link>
      <ul className="navbar-links">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
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
