import Home from "./components/Home.jsx";
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/notifications" element={<Notifications />} />
          <Route path="/Search" element={<Search />} /> */}
      </Routes>
    </>
  );
}