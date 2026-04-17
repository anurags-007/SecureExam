import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav className="navbar glass">
      <div className="logo">
        <span>🔒</span>
        <span>SecureExam</span>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/" className="nav-link">Dashboard</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link">Admin Panel</Link>
            )}
            {user.role === 'faculty' && (
              <Link to="/exam/create" className="nav-link">Create Exam</Link>
            )}
            
            <div className="nav-user">
              <span className="badge">{user.role}</span>
              <span>{user.name}</span>
            </div>

            <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
