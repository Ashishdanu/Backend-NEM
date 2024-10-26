import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import BookForm from './components/BookForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<BookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
