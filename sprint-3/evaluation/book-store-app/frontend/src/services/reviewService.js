import api from '../api';

const getReviewsByBookId = async (bookId) => {
    const response = await api.get(`/reviews/book/${bookId}`);
    return response.data;
};

export default { getReviewsByBookId };
