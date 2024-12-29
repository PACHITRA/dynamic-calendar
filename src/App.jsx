/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CRDashboard from './components/CRDashboard';
import Register from './components/Register';
import Admin from './components/Admin';
import EventManager from './components/EventManager';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<CRDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event-manager" element={<EventManager />} />
      </Routes>
    </Router>
  );
};

export default App;
