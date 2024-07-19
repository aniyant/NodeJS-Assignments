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
            alert('Order Placed Successfully. Order Confirmation Email Sent Successfully');
            clearCart();
            // history.push('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
        <h2>Cart</h2>
        <div className='cart'>
            {cart.length === 0  ? "your cart is empty.":null}
            {cart.map(item => (
                <CartItem key={item._id} item={item} />
            ))}
        </div>
        <button onClick={handlePlaceOrder} disabled={cart.length === 0 ? true:false}>Place Order</button>
        </>
    );
};

export default Cart;
