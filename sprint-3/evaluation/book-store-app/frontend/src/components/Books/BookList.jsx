import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import fetchBooks  from '../../services/bookService';
import BookCard from './BookCard';

const BookList = () => {
    const { addToCart } = useCart();
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(5); // Change this for more items per page

    const fetchBookData = async (page) => {
        try {
            const response = await fetchBooks(page, limit);
            console.log(response);
            setBooks(response.data.books);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBookData(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pagination.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="book-list">
            <h2>Book List</h2>
            <div className="books">
                {books.map(book => (
                    <BookCard book={book} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {pagination.totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === pagination.totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;
