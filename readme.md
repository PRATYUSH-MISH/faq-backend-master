
# 🌐 Backend FAQ Management API
A backend service for managing FAQs with multilingual support, caching, and an admin panel. Built with Node.js, Express, MongoDB, Redis, and auto-translation using Google Gemini API.

## ✨ Features
- ✅ Multilingual Support – Supports English, Hindi, Bengali, and can be extended to more languages.
- ✅ WYSIWYG Editor – Rich text formatting for FAQ answers, stored as HTML.
- ✅ Caching – Redis stores FAQs for faster responses (1-hour cache).
- ✅ Auto-Translation – Uses Google Gemini API to automatically translate questions and answers.
- ✅ Admin Panel – Manage FAQs via AdminJS with an intuitive UI.
- # 🌐 Backend FAQ Management API
A backend service for managing FAQs with multilingual support, caching, and an admin panel. Built with Node.js, Express, MongoDB, Redis, and auto-translation using Google Gemini API.


## 🚀 Installation & Setup
1️⃣ Clone the repository
```bash
git clone https://github.com/PRATYUSH-MISH/faq-backend-master.git
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
npm start
```
or with Nodemon (for development mode):
```bash
npm run dev
```
## 📖 API Endpoints
### Fetch all FAQs (with language selection)
```http
GET /api/faqs?lang=hi
```
[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime...",
    "language": "hi"
  }
]

### Create a new FAQ
```http
POST /api/faqs
```
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime...",
  "language": "en"
}
```

### Update an existing FAQ
```http
PUT /api/faqs/:id
```
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime...",
  "language": "en"
}
```

### Delete an FAQ
```http
DELETE /api/faqs/:id
```

### Fetch all FAQs with pagination
```http
GET /api/faqs?limit=10&page=1
```
[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime...",
    "language": "en"
  }
]

