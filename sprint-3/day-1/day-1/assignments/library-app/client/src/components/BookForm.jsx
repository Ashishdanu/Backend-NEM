import { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/books', { title, author }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
