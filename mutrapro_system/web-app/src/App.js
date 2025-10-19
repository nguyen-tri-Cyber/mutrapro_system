import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateOrderPage from './pages/CreateOrderPage'; // <-- THÊM DÒNG NÀY
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} /> 
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders/new" element={<CreateOrderPage />} /> {/* <-- THÊM DÒNG NÀY */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;