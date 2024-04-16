import Home from "./components/Home.jsx";
import Search from "./components/Search.jsx";
import Notifications from "./components/Notifications.jsx";
import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

export default function App() {

  const location = useLocation();

  useEffect(() => {
    document.title = `We Meet - ${getPageTitle(location.pathname)}`;
  }, [location]);

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/notifications':
        return 'Notifications';
      case '/search':
        return 'Search';
      default:
        return 'We Meet';
    }
  };

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/Search" element={<Search />} />
      </Routes>
    </>
  );
}