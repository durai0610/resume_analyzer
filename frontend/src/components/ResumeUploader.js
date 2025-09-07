import React, { useState } from 'react';
import { uploadResume } from '../api/resumeApi';
import './ResumeUploader.css';

const ResumeUploader = ({ onAnalysisComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setError('');
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      setError('Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await uploadResume(selectedFile);
      onAnalysisComplete(response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.error || 'An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <h3>Upload a Resume</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        className="upload-button"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {isLoading && <p>Please wait, analysis may take up to a minute...</p>}
    </div>
  );
};

export default ResumeUploader;