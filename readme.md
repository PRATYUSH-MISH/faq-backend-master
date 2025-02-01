
# 🌐 Backend FAQ Management API
A backend service for managing FAQs with multilingual support, caching, and an admin panel. Built with Node.js, Express, MongoDB, Redis, and auto-translation using Google Gemini API.

## ✨ Features
- ✅ Multilingual Support – Supports English, Hindi, Bengali, and can be extended to more languages.
- ✅ WYSIWYG Editor – Rich text formatting for FAQ answers, stored as HTML.
✅ Caching – Redis stores FAQs for faster responses (1-hour cache).
✅ Auto-Translation – Uses Google Gemini API to automatically translate questions and answers.
✅ Admin Panel – Manage FAQs via AdminJS with an intuitive UI.
✅ Unit Testing – API endpoints are covered with Mocha/Chai for reliability.

## 🚀 Installation & Setup
1️⃣ Clone the repository
```bash

git clonehttps://github.com/PRATYUSH-MISH/faq-backend-master.git
cd faq-backend
```
## 2️⃣ Install dependencies
```bash
npm install
```

## 3️⃣ Set up environment variables (.env)
Create a .env file in the root directory and add the following:
```bash
PORT=5000
MONGO_URI=mongodb+srv://your-db-url
REDIS_URL=redis://localhost:6379
GOOGLE_GEMINI_API_KEY=your-api-key
```
## 4️⃣ Start the server
```bash
Copy
Edit
npm start
```
or with Nodemon (for development mode):

```bash
npm run dev
```
## 📖 API Endpoints
🔹 Fetch all FAQs (with language selection)
```http

GET /api/faqs?lang=hi
```
[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime...",
    "language": "hi"
  }
]```