import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllResumes = () => {
  return api.get('/resumes');
};

export const getResumeById = (id) => {
  return api.get(`/resumes/${id}`);
};