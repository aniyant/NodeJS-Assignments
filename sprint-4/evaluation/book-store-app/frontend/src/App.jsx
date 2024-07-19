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
import { NotificationContextProvider, useNotifications } from './context/NotificationContext';

const Notifications = () => {
    const {notifications} = useNotifications();

    return (
        <div>
            <h3>Notifications</h3>
            {notifications.map((notification, index) => (
                <div key={index} className='notification'>
                    {notification}
                </div>
            ))}
        </div>
    )
}
const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <NotificationContextProvider>
                        <Navbar />
                        <Notifications/>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
                            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                        </Routes>
                        <Footer />
                    </NotificationContextProvider>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
