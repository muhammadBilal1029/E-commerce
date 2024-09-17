import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://myportfolio1029.vercel.app">
        Muhammad Bilal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://www.shutterstock.com/image-photo/car-drives-along-dirt-road-600nw-1369747538.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [componentloading,setcomponentloading]=useState(true);

const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
    Cookies.set('profile', JSON.stringify(codeResponse));
    window.location.href='/';
  },
  onError: (error) => console.log('Login Failed:', error),
  redirect_uri: 'https://e-commerce1029.vercel.app'
});
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    secretKey: "",
  });
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      userType: userType,
    }));
  }, [userType]);
  useEffect(() => {
    const token =localStorage.getItem("token");
    if(token){
      window.location.href='/'
    }
    else{
      setcomponentloading(false)
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (userData.userType === "Admin" && !userData.secretKey) {
        toast.error("Admin Secret Key is required!", { autoClose: 1000 });
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/api/auth/signup`,
        userData
      );
      const { token, userType,userProfile } = response.data;
      localStorage.setItem("token", token);
      Cookies.set('profile', JSON.stringify(userProfile));
      toast.success("Signup successful!", {
        autoClose: 500,
        onClose: () => {
          if (userType === "Admin") {
            window.location.href = "/Admin";
          } else {
            window.location.href = "/";
          }
        },
      });
      setUserData({
        name: "",
        email: "",
        password: "",
        userType: "",
        secretKey: "",
      });
    } catch (err) {
      console.error(
        "Signup error:",
        err.response ? err.response.data : err.message
      );

      toast.error(err.response.data.msg, {
        autoClose: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
    if(componentloading){
      return <Loader />; 
    }
 
     
  
  return (
    <>
      <ToastContainer />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <span style={{ marginRight: "30px" }}>Register As</span>
              <input
                required
                name="userType"
                type="radio"
                value="User"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              />
              <span style={{ marginLeft: "4px" }}>User</span>
              <input
                style={{ marginLeft: "5px" }}
                required
                name="userType"
                type="radio"
                value="Admin"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              />
              <span style={{ marginLeft: "4px" }}>Admin</span>

              {userType === "Admin" ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="secretKey"
                  label="Secret Key"
                  name="secretKey"
                  value={userData.secretKey || ""}
                  onChange={handleChange}
                />
              ) : null}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={userData.name}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked />}
                label="Remember me"
              />
              <div style={{ position: "relative" }}>
                {isLoading ? (
                  <div className="Loader">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                )}
              </div>
              <Grid container>
                <Grid item>
                  <Link
                    to="/login"
                    style={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
             
                <div style={{textAlign:'center',marginTop:'10px'}}><button type="button" className="signupwithgoogle_btn" onClick={() => login()}>Sign in with Google 🚀 </button></div>   
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
