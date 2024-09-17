import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import ProductList from "./Components/ProductList";
import Cart from "../src/Components/Cart";
import "./App.css";
import SignInSide from "./Components/Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LogInSide from "./Components/Login";
import AdminUser from "./Components/AdminUser";
import Loader from "./Components/Loader";
import NotFound from './Components/NotFound';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
   
    return () => clearTimeout(timer);

  }, []);
  const addToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
     window.location.href='/signup';
    } else {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    const existingProduct = storedCartItems.find(
      (item) => item.id === product.id
    );

    let updatedCartItems;

    if (existingProduct) {
     
      updatedCartItems = storedCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      
      updatedCartItems = [...storedCartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", 
      },
      secondary: {
        main: "#dc004e", 
      },
    },
  });
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  const updateQuantity = (productId, action) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === productId) {
          const newQuantity =
            action === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
 
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          
          {loading ? (
            <Loader />
          ) : (
            <>
              <Navbar cartItemCount={getCartItemCount()} />
             
              <Routes>
                <Route
                  path="/"
                  element={<ProductList addToCart={addToCart} />}
                />
                <Route
                  path="/cart"
                  element={
                    <Cart
                      cartItems={cartItems}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                    />
                  }
                />
                <Route path="/signup" element={<SignInSide />}></Route>
                <Route path="/login" element={<LogInSide />}></Route>
                <Route path="/Admin" element={<AdminUser />}></Route>
              
                <Route path="/NotFound" element={<NotFound/>} />
                <Route path="*" element={<Navigate to="/NotFound" />} />
              </Routes>
            </>
          )}
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
