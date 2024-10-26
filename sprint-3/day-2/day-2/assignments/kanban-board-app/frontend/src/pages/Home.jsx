import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TaskBoard from '../components/TaskBoard';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <button onClick={() => logout()}>Logout</button>
          <TaskBoard />
        </div>
      ) : (
        <div style={styles.guestMessage}>
          <h1>Welcome, Guest!</h1>
          <p>Please log in to access your account.</p>
          <a href="/login" style={styles.link}>Login</a> | <a href="/register" style={styles.link}>Register</a>
        </div>
      )}
    </div>
  );
};

// Styles for better visual representation
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  guestMessage: {
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
  },
};

export default Home;
