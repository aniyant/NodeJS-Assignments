import api from '../api';

const placeOrder = async (cart) => {
    const order = {
        items: cart.map(item => ({
            bookId: item._id,
            quantity: 1,  // Assuming 1 quantity for simplicity
            price: item.price
        }))
    };
    const response = await api.post('/orders', order);
    return response.data;
};

export default { placeOrder };
