import React from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';
import { Box, Divider } from '@mui/material';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Save user data to local storage
    localStorage.setItem('userData', JSON.stringify({ email, password }));
    
    // Redirect user to login page after signing up
    navigate('/');
  };

  return (
    <Box className="sign-up-box">
      <Box className="sign-up-form">
        <h1>Sign Up Now</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" className="input-box" placeholder="Your Email"/>
          <input type="password" name="password" className="input-box" placeholder="Your Password" />
          <p><span><input type="checkbox" /></span> I agree to the terms and services</p>
          <button type="submit" className="signup-btn">Sign up</button>
          <Divider></Divider>
          <p>Already have an account ? <a href="/">Login</a></p>
        </form>
      </Box>
    </Box>
  );
}