import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamCreator from './pages/ExamCreator';
import AdminPanel from './pages/AdminPanel';
import ExamDetail from './pages/ExamDetail';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthContext>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/exam/create" element={<ExamCreator />} />
            <Route path="/exam/:id" element={<ExamDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* Fallback */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
