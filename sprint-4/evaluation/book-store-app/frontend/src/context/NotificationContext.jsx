import React, { createContext, useContext, useEffect } from "react";
import {io} from 'socket.io-client'

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
}

export const NotificationContextProvider = ({ children }) => {
    const [notifications, setNotifications] = React.useState([]);
    const socket = io('https://book-store-app-q3hq.onrender.com', {
        withCredentials: true
    });

    useEffect(()=>{
        // console.log('notifications');
        socket.on('newBook',(book) => {
            setNotifications((prev) => [...prev,`New book added: ${book.title}`]);
        });

        socket.on('orderPlaced',(order) => {
            setNotifications((prev) => [...prev,`Order placed for orderId: ${order.id}`]);
        });
        socket.on('OrderConfirmedEmailSent',(order) => {
            setNotifications((prev) => [...prev,`Order confirmed Email Sent for orderId: ${order.id}`]);
        });
    },[]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    )
}