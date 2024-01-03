import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, CssBaseline, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast } from 'react-toastify';
import { Link as RouterLink, useNavigate } from "react-router-dom";

//using inline styling since this is a small single component
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//Creating a single form for signin and signup and handling the fields based on Prop
const AuthForm = ({ isLogin }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
    if (token && token !== "undefined") {
      setIsLoggedIn(true);
      //Redirect to Application page
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Password validation
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least 1 letter, 1 number, and 1 special character.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //A manual hard coded approach since we only have two routes
      const endpoint = isLogin ? "signin" : "signup";
      if (!isLogin) {
        // Password validation before making the signup call
        validatePassword(formData.password);
        if (passwordError) {
          toast.error(`Error: ${passwordError}`);
          return;
        }
      }
      const requestData = isLogin ? { email: formData.email, password: formData.password } : formData;

      // since this is the only call so hitting directly, else the exios config and API calls should go to utils
      const response = await axios.post(`http://localhost:3000/user/${endpoint}`, requestData);

      if (response.status === 201 || response.status === 200) {
        toast.success(`Success: ${response.data.message}`);
        if (isLogin) {
          setIsLoggedIn(true);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }
        //Redirect to Application page
        navigate("/");
      }
    } catch (error) {
      console.error(`${isLogin ? "Signin" : "Signup"} failed:`, error.message);
      toast.error(`Error: ${error.response.data.message}`);
      // If error.response is undefined, logging the whole error here instead of a fallback UI - not a best practise
      if (error.response) {
        console.error("Server response:", error.response);
      } else {
        console.error("Full error:", error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography component="h1" variant="h5">
              {isLoggedIn ? "Welcome back!" : (isLogin ? "Sign In" : "Sign Up")}
            </Typography>
            {/*In case the user is logged in and the redirection fails due to an error or if the route is manually hit we display this*/}
            {isLoggedIn ? (
              <Typography>
                You are already logged in.{" "}
                <RouterLink to="/" variant="body2">
                  Go to the application
                </RouterLink>
              </Typography>
            ) : (
              <form className={classes.form} onSubmit={handleSubmit}>
                {!isLogin && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleInputChange}
                    required
                  />
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  required
                  error={!!passwordError}
                  helperText={isPasswordFocused ? passwordError : ''}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>
            )}
            <Typography>
              {isLoggedIn ? "Not you? " : (isLogin ? "Don't have an account?" : "Already have an account?")}{" "}
              <RouterLink to={isLoggedIn ? "/logout" : (isLogin ? "/signup" : "/signin")} variant="body2">
                {isLoggedIn ? "Log out" : (isLogin ? "Sign Up" : "Sign In")}
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthForm;
