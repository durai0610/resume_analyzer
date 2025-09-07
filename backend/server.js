const express = require('express');
const cors = require('cors'); // Make sure you've installed this package
const resumeRoutes = require('./routes/resumeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config'); // Corrected path

const app = express();

// CORS Configuration
const corsOptions = {
  origin: config.frontend.url,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/resumes', resumeRoutes);
app.use(errorHandler);

const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});