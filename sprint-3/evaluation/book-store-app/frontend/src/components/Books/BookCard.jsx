import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import reviewService from '../../services/reviewService';

const BookCard = ({ book }) => {
    const { addToCart } = useCart();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await reviewService.getReviewsByBookId(book._id);
                setReviews(fetchedReviews);
                const avgRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0) / fetchedReviews.length || 0;
                setAverageRating(avgRating);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [book._id]);

    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Price: ${book.price}</p>
            <p>Average Rating: {averageRating.toFixed(1)} ({reviews.length} reviews)</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
        </div>
    );
};

export default BookCard;
