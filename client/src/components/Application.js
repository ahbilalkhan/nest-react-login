import React, { useState, useEffect } from "react";
import { Container, Typography, CssBaseline, ThemeProvider, createTheme, Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
});

// just a basic fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Application = () => {
  const navigate = useNavigate();
  //Deciding the isLoggedIn based on the presence of a token in local storage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Update isLoggedIn when the component mounts or when the token changes
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const handleLogout = async () => {
    try {
      // Clear client-side local storage
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to the login page
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          animation: `${fadeIn} 1s ease-in-out`, // using inline styling since this is a small single component usually it should go in styles.module.scss
        }}
      >
        <Typography component="h1" variant="h2" mb={4} sx={{ whiteSpace: 'nowrap' }}>
          {isLoggedIn ? 'WELCOME TO THE APPLICATION!' : 'HOME PAGE.'}
        </Typography>

        {isLoggedIn ? (
          <Button onClick={handleLogout} variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Logout
          </Button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button component={Link} to="/signin" variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Login
            </Button>
            <Button component={Link} to="/signup" variant="contained" color="primary">
              Signup
            </Button>
          </div>
        )}
      </Container>
      <footer style={{ textAlign: 'center', marginTop: 'auto', padding: '10px' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Ahmed Bilal Khan
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default Application;
