import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password, navigate) => {
    try {
      const res = await API.post('/users/login', { username, password });
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      navigate('/');
    } catch (err) {
      console.error('Login failed', err.response ? err.response.data : err);
    }
  };

  const register = async (username, password, navigate) => {
    try {
      await API.post('/users/register', { username, password });
      login(username, password, navigate);
    } catch (err) {
      console.error('Registration failed', err.response ? err.response.data : err);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Specify that 'children' is a required prop of type 'node'
};

export default AuthContext;
