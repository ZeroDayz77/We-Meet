import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from '../App';


function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {`Copyright © WeMeet ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {

    document.title = `We Meet - Login`;

    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const enteredEmail = formData.get('email');
        const enteredPassword = formData.get('password');
        // gets user data from local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && enteredEmail === userData.email && enteredPassword === userData.password) {
            setLoggedIn(true);
        } else {
            alert('User not found');
        }
    };

    if (loggedIn) {
        return <App />;
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className='login-container' Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#46517a",
            padding: 3,
            borderRadius: 5
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: "white" }}>
            Login!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{style: {color: "white" }}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{style: {color: "white" }}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" style={{color: "white" }}/>}
              label={<Typography style={{color: "white" }}>Remember me</Typography>}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{color: "white" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2" style={{color: "white" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4,  }}/>
      </Container>
    </ThemeProvider>
  );
}