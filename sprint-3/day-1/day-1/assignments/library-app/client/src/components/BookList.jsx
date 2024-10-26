import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axiosInstance.get('/books', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error.response.data.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
