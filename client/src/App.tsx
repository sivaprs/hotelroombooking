import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import './App.css';
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import Bookings from "./pages/bookings";

function App() {
  return (
    <Router>
       <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
