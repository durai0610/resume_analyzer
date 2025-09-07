import React from 'react';
import './AnalysisDetails.css';

const AnalysisDetails = ({ data }) => {
  if (!data) return <div>No data to display.</div>;

  return (
    <div className="analysis-details-container">
      <h2>Resume Analysis</h2>

      <div className="analysis-section">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> {data.name || 'N/A'}</p>
        <p><strong>Email:</strong> {data.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {data.phone || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> {data.linkedin_url || 'N/A'}</p>
        <p><strong>Portfolio:</strong> {data.portfolio_url || 'N/A'}</p>
      </div>

      <div className="analysis-section">
        <h3>Summary</h3>
        <p>{data.summary || 'N/A'}</p>
      </div>

      <div className="analysis-section">
        <h3>Rating and Feedback</h3>
        <p><strong>Rating:</strong> {data.resume_rating ? `${data.resume_rating}/10` : 'N/A'}</p>
        <p><strong>Areas for Improvement:</strong></p>
        <p>{data.improvement_areas || 'N/A'}</p>
        <p><strong>Upskill Suggestions:</strong></p>
        <ul>
          {data.upskill_suggestions?.map((skill, index) => (
            <li key={index}>{skill}</li>
          )) || 'N/A'}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>Work Experience</h3>
        {data.work_experience?.length > 0 ? (
          data.work_experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h4>{exp.role || 'N/A'} at {exp.company || 'N/A'}</h4>
              <p>Duration: {exp.duration || 'N/A'}</p>
              <ul>
                {exp.description?.map((desc, i) => (
                  <li key={i}>{desc}</li>
                )) || null}
              </ul>
            </div>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>

      <div className="analysis-section">
        <h3>Education</h3>
        {data.education?.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <p><strong>Degree:</strong> {edu.degree || 'N/A'}</p>
              <p><strong>Institution:</strong> {edu.institution || 'N/A'}</p>
              <p><strong>Year:</strong> {edu.graduation_year || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>

      <div className="analysis-section">
        <h3>Skills</h3>
        <div className="skills-section">
          <div>
            <h4>Technical Skills:</h4>
            <ul>
              {data.technical_skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) || <p>N/A</p>}
            </ul>
          </div>
          <div>
            <h4>Soft Skills:</h4>
            <ul>
              {data.soft_skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) || <p>N/A</p>}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalysisDetails;