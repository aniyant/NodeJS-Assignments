import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import cartService from '../../services/cartService';
// import { useHistory } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart } = useContext(CartContext);
    // const history = useHistory();

    const handlePlaceOrder = async () => {
        try {
            await cartService.placeOrder(cart);
            clearCart();
            // history.push('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            {cart.map(item => (
                <CartItem key={item._id} item={item} />
            ))}
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default Cart;
