import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './ExamDetail.css';

const ExamDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/exams/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch exam');

        const data = await response.json();
        setExam(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id, token]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
        <div className="exam-detail">
          {error ? (
            <div className="alert alert-error">{error}</div>
          ) : exam ? (
            <>
              <header style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h1>{exam.title}</h1>
                    <p className="text-muted">Review exam structure and assessment criteria.</p>
                  </div>
                  {exam.fileAttachment && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        const win = window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/exams/${id}/download`, '_blank');
                        win.focus();
                      }}
                    >
                      📥 Download Paper
                    </button>
                  )}
                </div>
              </header>

              <div className="exam-info">
                <div className="info-section">
                  <h3>Assessment Properties</h3>
                  <p><span>Subject</span> <strong>{exam.subject}</strong></p>
                  <p><span>Target Class</span> <strong>{exam.class || 'General'}</strong></p>
                  <p><span>Max Score</span> <strong>{exam.totalMarks} Pt</strong></p>
                  <p><span>Allotted Time</span> <strong>{exam.duration} Min</strong></p>
                  <p>
                    <span>Condition</span> 
                    <span className={`badge badge-${exam.status === 'published' ? 'success' : 'failed'}`}>
                      {exam.status}
                    </span>
                  </p>
                </div>

                <div className="info-section">
                  <h3>Document Info</h3>
                  {exam.fileAttachment ? (
                    <>
                      <p><span>File Name</span> <strong>{exam.fileAttachment.originalName}</strong></p>
                      <p><span>Type</span> <strong>{exam.fileAttachment.mimeType.split('/')[1].toUpperCase()}</strong></p>
                      <p><span>Size</span> <strong>{(exam.fileAttachment.size / 1024 / 1024).toFixed(2)} MB</strong></p>
                    </>
                  ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No external document attached. This is a digital-first assessment.</p>
                  )}
                </div>

                {exam.description && (
                  <div className="info-section" style={{ gridColumn: '1 / -1' }}>
                    <h3>Strategic Overview</h3>
                    <p style={{ display: 'block', border: 'none', color: 'var(--text-muted)' }}>
                      {exam.description}
                    </p>
                  </div>
                )}
              </div>

              {exam.questions?.length > 0 && (
                <div className="questions-section">
                  <h2>Questionnaire Matrix ({exam.questions.length} Items)</h2>
                  {exam.questions.map((question, index) => (
                    <div key={index} className="question-view">
                      <h4>
                        <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>#{index + 1}</span>
                        {question.text}
                      </h4>
                      <div className="paper-meta" style={{ marginBottom: '0.5rem' }}>
                        <span className="meta-item">🎯 {question.marks} Points</span>
                        <span className="meta-item" style={{ textTransform: 'capitalize' }}>🏷️ {question.difficulty}</span>
                        <span className="meta-item" style={{ textTransform: 'uppercase' }}>📄 {question.questionType}</span>
                      </div>
                      {question.options?.length > 0 && (
                        <ul>
                          {question.options.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="card text-center">
              <p>Exam record not found in the repository.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamDetail;
