const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const config = require('../config');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(config.google.apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Could not parse the PDF file.');
  }
};

const analyzeResumeWithGemini = async (resumeText) => {
  const prompt = `
  You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure. All fields should be populated. If a field's information isn't available, use null for strings and numbers, and empty arrays [] for array fields. Do not include any text, markdown formatting (e.g., code blocks), or conversational filler before or after the JSON object. The response must be a single, raw JSON object.

  Resume Text:
  """
  ${resumeText}
  """

  JSON Structure:
  {
    "name": "string | null",
    "email": "string | null",
    "phone": "string | null",
    "linkedin_url": "string | null",
    "portfolio_url": "string | null",
    "summary": "string | null",
    "work_experience": [{ "role": "string | null", "company": "string | null", "duration": "string | null", "description": ["string"] }],
    "education": [{ "degree": "string | null", "institution": "string | null", "graduation_year": "string | null" }],
    "technical_skills": ["string"],
    "soft_skills": ["string"],
    "projects": [{ "name": "string | null", "description": "string | null" }],
    "certifications": ["string"],
    "resume_rating": "number (1-10) | null",
    "improvement_areas": "string | null",
    "upskill_suggestions": ["string"]
  }
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim(); // Use a mutable variable

    // Clean up the markdown wrapper if present
    if (text.startsWith('```json')) {
      text = text.substring(7); // Remove '```json'
    }
    if (text.endsWith('```')) {
      text = text.slice(0, -3); // Remove '```'
    }
    
    return JSON.parse(text); // Parse the cleaned string
  } catch (error) {
    console.error('Error with Gemini API:', error);
    throw new Error('AI analysis failed. Please try again.');
  }
};


module.exports = {
  extractTextFromPdf,
  analyzeResumeWithGemini,
};
