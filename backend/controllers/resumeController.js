const db = require('../db');
const analysisService = require('../services/analysisService');

const uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file uploaded.' });
  }

  try {
    const resumeText = await analysisService.extractTextFromPdf(req.file.buffer);
    const analysisResult = await analysisService.analyzeResumeWithGemini(resumeText);

    const {
      name, email, phone, linkedin_url, portfolio_url, summary,
      work_experience, education, technical_skills, soft_skills, projects, certifications,
      resume_rating, improvement_areas, upskill_suggestions
    } = analysisResult;

    const queryText = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects, certifications,
        resume_rating, improvement_areas, upskill_suggestions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *;
    `;
    const values = [
      req.file.originalname, name, email, phone, linkedin_url, portfolio_url, summary,
      JSON.stringify(work_experience), JSON.stringify(education), JSON.stringify(technical_skills),
      JSON.stringify(soft_skills), JSON.stringify(projects), JSON.stringify(certifications),
      resume_rating, improvement_areas, JSON.stringify(upskill_suggestions)
    ];

    const result = await db.query(queryText, values);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    // Pass the error to the centralized error handler
    next(error);
  }
};

const getAllResumes = async (req, res, next) => {
  try {
    const queryText = `
      SELECT
        id, uploaded_at, file_name, name, email, phone, resume_rating
      FROM resumes
      ORDER BY uploaded_at DESC;
    `;
    const result = await db.query(queryText);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryText = 'SELECT * FROM resumes WHERE id = $1;';
    const result = await db.query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResume,
  getAllResumes,
  getResumeById,
};