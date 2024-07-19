import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
                      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                    </Routes>
                    <Footer />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
