import React, { useState, useEffect } from 'react';
import { getAllResumes, getResumeById } from '../api/resumeApi';
import './HistoricalViewer.css';

const HistoricalViewer = ({ onSelectResume }) => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await getAllResumes();
        setResumes(response.data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        setError('Failed to load historical data. Please check your network.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDetailsClick = async (id) => {
    setIsLoading(true);
    try {
      const response = await getResumeById(id);
      // Pass the full analysis data back to the parent component (App.js)
      onSelectResume(response.data);
    } catch (err) {
      console.error("Failed to fetch resume details:", err);
      setError('Failed to fetch resume details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading past resumes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="historical-viewer-container">
      <h2>Previously Analyzed Resumes</h2>
      {resumes.length > 0 ? (
        <table className="resumes-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id}>
                <td data-label="File Name">{resume.file_name}</td>
                <td data-label="Name">{resume.name || 'N/A'}</td>
                <td data-label="Email">{resume.email || 'N/A'}</td>
                <td data-label="Rating">{resume.resume_rating ? `${resume.resume_rating}/10` : 'N/A'}</td>
                <td data-label="Uploaded At">{new Date(resume.uploaded_at).toLocaleDateString()}</td>
                <td data-label="Actions">
                  <button onClick={() => handleDetailsClick(resume.id)} className="details-button">
                    View Analysis
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No resumes have been analyzed yet.</p>
      )}
    </div>
  );
};

export default HistoricalViewer;