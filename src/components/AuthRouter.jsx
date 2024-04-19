import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import App from '../App.jsx';

const AuthRouter = () => {

    const isAuthenticated = localStorage.getItem('userData') !== null;

    return (
      <Routes>
        <Route path="/" element={isAuthenticated ? <App /> : <Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    );
};

export default AuthRouter;
