import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import HistoricalViewer from './components/HistoricalViewer';
import AnalysisDetails from './components/AnalysisDetails';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisData, setAnalysisData] = useState(null);

  // This function is now passed to BOTH ResumeUploader AND HistoricalViewer
  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setActiveTab('analysis'); // Switches to the analysis view
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        // Pass the function to the uploader
        return <ResumeUploader onAnalysisComplete={handleAnalysisComplete} />;
      case 'history':
        // Pass the function to the historical viewer
        return <HistoricalViewer onSelectResume={handleAnalysisComplete} />;
      case 'analysis':
        // This view is used by both tabs
        return <AnalysisDetails data={analysisData} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Resume Analyzer</h1>
      </header>
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'upload' || activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('upload');
            setAnalysisData(null);
          }}
        >
          Resume Analysis
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Historical Viewer
        </button>
      </div>
      <div className="content-container">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;