import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: '#f0f4f8',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .05)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const AuthPage = ({setLogged, setSession}) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  setSession("logIn")
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isSignIn) {
      // Sign In logic
      if (formData.email === 'eg@mail.com' && formData.password === '1234') {
        console.log('Login successful');
        setSession("home");
        setLogged(true);
      } else {
        console.log('Invalid email or password');
        alert('Invalid email or password');
      }
    } else {
      // Sign Up logic (if needed, or just placeholder)
      console.log('Sign Up form submitted:', formData);
      // Here you would handle sign-up logic or validations
    }
  };
  

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <StyledContainer maxWidth="xs">
      <CssBaseline />
      <StyledForm onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Typography>
        {!isSignIn && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus={isSignIn}
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
        />
        {!isSignIn && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}
        {isSignIn && (
          <Box mt={1}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        )}
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // onClick={() => {
          //   setSession("home")
          //   setLogged(true)}}
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </StyledButton>
        <Box mt={2}>
          <Typography align="center">
            {isSignIn ? "Don't have an account? " : 'Already have an account? '}
            <Link href="#" onClick={toggleForm} variant="body2">
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </Link>
          </Typography>
        </Box>
      </StyledForm>
    </StyledContainer>
  );
};

export default AuthPage;