import api from '../api';

// const getAllBooks = async () => {
//     const response = await api.get('/books');
//     return response.data.books;
// };

const fetchBooks = async (page, limit) => {
    const response = await api.get(`/books?page=${page}&limit=${limit}`);
    return response;
};


export default fetchBooks;
