import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";


const Navbar = ({ cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isAuthenticated, setIsAuthenticated] =  useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleclickcart=()=>{
    const token =localStorage.getItem("token");
    if(!token){
      window.location.href='/signup';
    }
    else{
        window.location.href='/cart';
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  window.location.href="/login";
  };
  return (
    <nav className="navbar-section">
      <Link className="navbar-brand" to="/">
        E-commerce
      </Link>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? "open" : "d-none"}`}>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" onClick={toggleMobileMenu}>
            <div className="cart-container">
              <span className="cart-count">{cartItemCount}</span>
              Cart
            </div>
          </Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
          <a className="nav-link" style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                onClick={toggleMobileMenu}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={toggleMobileMenu}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul className={`navbar-links desktop_links`}>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={handleclickcart}>
            <div className="cart-container">
              <span className="cart-count">{cartItemCount}</span>
              Cart
            </div>
          </Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
           <Link className="nav-link" style={{cursor:'pointer'}}  onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
