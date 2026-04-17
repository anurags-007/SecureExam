import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [logs, setLogs] = useState([]);
  const [auditTrail, setAuditTrail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.role !== 'admin') {
      return;
    }

    if (activeTab === 'logs') {
      fetchLogs();
    } else if (activeTab === 'audit') {
      fetchAuditTrail();
    }
  }, [activeTab, token]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/logs/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditTrail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/logs/audit`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAuditTrail(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching audit trail:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="admin-panel">
          <header>
            <h1>System Oversight</h1>
            <p className="text-muted">Monitor platform activity and security audit trails.</p>
          </header>

          <div className="tabs">
            {['users', 'logs', 'audit', 'alerts'].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'users' && (
              <div>
                <h2>Identity Management</h2>
                <div className="alert alert-warning">
                  User management administrative controls are currently being finalized.
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <h2>Real-time Access Logs</h2>
                {loading ? <div className="spinner"></div> : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>User Identity</th>
                          <th>Operation</th>
                          <th>Timestamp</th>
                          <th>Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 600 }}>{log.userId?.name || 'System'}</td>
                            <td>{log.action}</td>
                            <td>{new Date(log.createdAt).toLocaleString()}</td>
                            <td>
                              <span className={`badge badge-${log.status === 'success' ? 'success' : 'failed'}`}>
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <h2>Security Audit Trail</h2>
                {loading ? <div className="spinner"></div> : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Actor</th>
                          <th>Action</th>
                          <th>Entity Type</th>
                          <th>Severity</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditTrail.map((entry, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 600 }}>{entry.performedBy?.name || 'System'}</td>
                            <td><code>{entry.action}</code></td>
                            <td>{entry.entityType}</td>
                            <td>
                              <span className={`badge badge-${entry.severity === 'high' || entry.severity === 'critical' ? 'critical' : entry.severity}`}>
                                {entry.severity}
                              </span>
                            </td>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'alerts' && (
              <div>
                <h2>Security Incident Alerts</h2>
                <div className="alert alert-warning">
                  Intrusion detection and real-time alerts are currently inactive.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
