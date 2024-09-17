import React, { useState, useEffect  } from "react";
import { Link,useLocation } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import Popup from 'reactjs-popup';
const Navbar = ({ cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
  const [navbarscrolled,setnavbarscrolled]=useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const location=useLocation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isAuthenticated, setIsAuthenticated] =  useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const profileData = Cookies.get('profile');
   
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData); 
        const accessToken = parsedProfile.access_token;
        axios
          .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setProfile(res.data); 
          })
          .catch((err) => console.log("Error fetching profile data:", err));
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    if (token) {
       setIsAuthenticated(true);
        const checkUserType = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_Backend_URL}/api/Admin/AdminUsertype`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.userType === 'Admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error verifying token or user type', error);
        }
        finally {
          setLoading(false);
        }
      }
    
      checkUserType();
    }
    else {
      setLoading(false);
    }
    const handlescroll=()=>{
      if (window.scrollY > 50) {
       setnavbarscrolled(true);
      } else {
        setnavbarscrolled(false);
      }
    }
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  const handleclickcart=()=>{
    const token =localStorage.getItem("token");
    const profileData = Cookies.get('profile');
    if(!token &&  !profileData){
      window.location.href='/signup';
    }
    else{
        window.location.href='/cart';
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    googleLogout();
    Cookies.remove('profile');
  window.location.href="/login";
  };
  if (loading) {
    return <Loader/>;
  }
  return (
    <nav className={`navbar-section ${navbarscrolled ? "navbar-sticky " : ""}`}>
      <Link className="navbar-brand" to="/">
        Shopping Store
      </Link>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? "open" : "d-none"}`}>
        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link className="nav-link" to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
        </li>
        <li className={`nav-item  ${location.pathname === '/cart' ? 'active' : ''}`}>
          <Link className="nav-link"  onClick={()=>{
            toggleMobileMenu();
            handleclickcart();
          }}>
            <div className="cart-container">
              <span className="cart-count">{cartItemCount}</span>
              Cart
            </div>
          </Link>
        </li>
        {isAuthenticated ? (
          <>
          <li className="nav-item">
          <a className="nav-link" style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a>
          </li>
           
          {isAdmin && (
          <>
            <li className={`nav-item ${location.pathname === '/Admin' ? 'active' : ''}`}><Link className="nav-link" onClick={toggleMobileMenu} to="/Admin">Admin Dashboard</Link></li>
          </>
        )}
          
           </>
        ) : (
          <>
           
           {profile ? (
        <div className="nav-item profile-container">
            <Popup
                  trigger={
                    <a className="nav-link" style={{ cursor: 'pointer' }}>
                      <img
                        src={profile.picture}
                        alt="avatar"
                        style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
                      />
                     
                    </a>
                  }
                  position="bottom right"
                >
                  <div className={`profile-popup`}>
                    <img
                      src={profile.picture}
                      alt="avatar"
                      style={{ width: '50px', borderRadius: '50%' }}
                    />
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    
                    <button onClick={handleLogout} className="nav-link">
                      Logout
                    </button>
                  </div>
                </Popup>
        </div>
        
      ) : (
        <>
        
          <li className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`}>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      )}
          </>
        )}
      </ul>
      <ul className={`navbar-links desktop_links`}>
        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className={`nav-item  ${location.pathname === '/cart' ? 'active' : ''}`}>
          <Link className="nav-link" onClick={handleclickcart}>
            <div className="cart-container">
              <span className="cart-count">{cartItemCount}</span>
              Cart
            </div>
          </Link>
        </li>
        {isAuthenticated ? (
    <>
      
      <li className="nav-item">
        <Link className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
          Logout
        </Link>
      </li>

     
      {isAdmin && (
        <li className={`nav-item ${location.pathname === '/Admin' ? 'active' : ''}`}>
          <Link className="nav-link" to="/Admin">
            Admin Dashboard
          </Link>
        </li>
      )}
    </>
  ) : (
    <>
     
      {profile ? (
        <div className="nav-item profile-container">
            <Popup
                  trigger={
                    <a className="nav-link" style={{ cursor: 'pointer' }}>
                      <img
                        src={profile.picture}
                        alt="avatar"
                        style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
                      />
                     
                    </a>
                  }
                  position="bottom right"
                >
                  <div className={`profile-popup`}>
                    <img
                      src={profile.picture}
                      alt="avatar"
                      style={{ width: '50px', borderRadius: '50%' }}
                    />
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    
                    <button onClick={handleLogout} className="nav-link">
                      Logout
                    </button>
                  </div>
                </Popup>
        </div>
        
      ) : (
        <>
        
          <li className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`}>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      )}
    </>
  )}
      </ul>
    </nav>
  );
};

export default Navbar;
