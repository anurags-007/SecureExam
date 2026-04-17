import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ 
        height: 'calc(100vh - 100px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <div className="not-found-card" style={{ maxWidth: '500px' }}>
          <h1 style={{ 
            fontSize: '8rem', 
            fontWeight: 800, 
            margin: 0, 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1
          }}>404</h1>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
            Domain Out of Bounds
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            The assessment resource you are attempting to access does not exist or has been relocated to a restricted archive.
          </p>
          <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            Return to Command Center
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
