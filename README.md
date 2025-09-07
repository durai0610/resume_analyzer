# Resume Analyzer

### 1. What Is This Project?

This app helps people get their dream job by using a powerful AI to analyze and improve their resumes. Just upload a PDF, and the AI will give you a score and tell you what you can do to make it better. It's a great tool to show off your skills as a developer!

---

### 2. Key Features :

* **Easy Upload:** Just drag and drop your resume (PDF format only).
* **AI Power:** The app uses AI to automatically read and understand everything on your resume.
* **Detailed Feedback:** It gives you a score and specific suggestions on how to improve your skills section, work experience, and more.
* **History:** You can see all the resumes you've analyzed in the past.

---

### 3. Technologies Used :

| Part of the App | Technologies | What It Does |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express | The server that runs the API. |
| | Google Gemini AI | The powerful AI that analyzes the resumes. |
| | PostgreSQL | The database where we store the resume info. |
| **Frontend** | React | The website you see and interact with. |

---

### 4. How to Get It Running :

Follow these steps, and you'll be good to go.

#### Get the Code :

First, you need to get the code onto your computer. If you're using Git, you'll run this command:

```bash
git clone [repository-url]
cd resume-analyzer
```

### 5. Set Up the Backend :
Now, let's get the server running.

Go into the backend folder:
```bash
cd backend
```

Install all the necessary packages:

```bash
npm install
```

### 6. Create Environment File :

Create a file named **`.env`** in the backend folder.  
This file will hold your secret keys so they are not exposed in the code.

```env
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
GOOGLE_API_KEY=your_gemini_api_key
```
Now, start the server!

```bash
npm start
or
node server.js
```
---

### 7. Set Up the Frontend :
Open a new terminal window and go to the frontend folder:

```bash
cd ../frontend
```

Install the frontend packages:
```bash
npm install
```

Start the website:

```bash
npm start
```

The app will open in your web browser at http://localhost:3000.

---

### 8. API Endpoints :
These are the different addresses the frontend talks to on the backend:

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST    | `/api/resumes/upload`                | Uploads a PDF resume for analysis             |
| GET    | `/api/resumes`           | Gets a list of all the resumes you've analyzed            |
| GET    | `/api/resumes/:id`       | Gets all the detailed info for one specific resume          |
