import React from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import background from "/wemeet group pic.jpg";

export default function SignUp() {

  document.title = `We Meet - Sign up`;

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
    <Box className="sign-up-box" sx={{ backgroundImage: `url(${background})` }}>
      <Box className="sign-up-form">
        <h1>Sign Up Now</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" className="input-box" placeholder="Your Email" />
          <input type="password" name="password" className="input-box" placeholder="Your Password" />
          <p className='tos'><span><input type="checkbox" required/></span> I agree to the terms and services</p>
          <button type="submit" className="signup-btn">Sign up</button>
          <Divider></Divider>
          <p className='login-redirect'>Already have an account ? <a href="/">Login</a></p>
        </form>
      </Box>
    </Box>
  );
}