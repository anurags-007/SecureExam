import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'faculty',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.role, formData.department);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-hero">
        <h2>Join the Future of Secure Assessment.</h2>
        <div className="auth-features">
          <div className="feature-item">
            <div className="feature-icon">📝</div>
            <div className="feature-text">
              <h4>Role-Based Access</h4>
              <p>Specialized interfaces for Faculty, Reviewers, and Administrators.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">
              <h4>Encrypted Drafting</h4>
              <p>Your content is secured with industry-standard encryption from the first keystroke.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌐</div>
            <div className="feature-text">
              <h4>Global Standards</h4>
              <p>Built to comply with international academic integrity frameworks.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-box">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Start your 14-day administrative trial.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Dr. John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="john.smith@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Secure Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Primary Role</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="faculty">Faculty</option>
                  <option value="reviewer">Reviewer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-input"
                  placeholder="e.g. CS"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Profile...' : 'Begin Registration'}
            </button>
          </form>

          <p className="auth-link">
            Already registered? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
