import React from 'react';

const CartItem = ({ item }) => {
    return (
        <div>
            <h4>{item.title}</h4>
            <p>{item.author}</p>
            <p>{item.genre}</p>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
        </div>
    );
};

export default CartItem;
