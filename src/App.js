import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from '../src/Components/Cart';
import './App.css'; 
import SignInSide from './Components/Signup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogInSide from './Components/Login';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);
  const addToCart = (product) => {
   
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProduct = storedCartItems.find(item => item.id === product.id);

    let updatedCartItems;
  
    if (existingProduct) {
      // If the product exists, update its quantity
      updatedCartItems = storedCartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If the product doesn't exist, add it with an initial quantity of 1
      updatedCartItems = [...storedCartItems, { ...product, quantity: 1 }];
    }
  setCartItems(updatedCartItems);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (product) => {
   
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
  setCartItems(updatedCartItems);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Custom primary color
      },
      secondary: {
        main: '#dc004e', // Custom secondary color
      },
    },
  });
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  const updateQuantity = (productId, action) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity 0

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Navbar cartItemCount={getCartItemCount()}/>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path='/signup' element={<SignInSide/>}></Route>
        <Route path='/login' element={<LogInSide/>}></Route>
       
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;