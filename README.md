# 🧠 NotebookLM Clone

A web-based application inspired by Google NotebookLM. It allows users to:

- Upload PDF documents
- View the PDF in-browser
- Chat with an AI about the document
- Get answers with cited page references

Built with:

- ⚛️ React + TailwindCSS (Frontend)
- 🟩 Node.js + Express (Backend)
- 🤖 OpenAI API (or mocked for local dev)
- 📄 PDF parsing + vector embeddings

---

## 🚀 Features

✅ Upload large PDFs  
✅ View documents page by page  
✅ Ask questions about the content  
✅ Get cited answers (e.g. “Page 2”)  
✅ Scroll to cited page  
✅ Fully mocked mode for local testing

## 📂 Folder Structure

notebooklm-clone/
├── backend/
│ ├── app.js
│ ├── routes/
│ ├── services/
│ ├── uploads/
│ ├── .env.example ✅
│ └── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ ├── .env.example ✅
│ └── package.json
├── README.md ✅
├── .gitignore
└── start-all.sh ✅

---

## 🛠️ Installation

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd notebooklm_clone
```

### 2. Create environment variable files

- backend/.env
  OPENAI_API_KEY=your-openai-api-key

- frontend/.env
  REACT_APP_API_URL=http://localhost:5000

## Get your OpenAI key from https://platform.openai.com/account/api-keys

### 3. Run both frontend and backend

---

### 🌍 Deployment Instructions

🔹 Backend: Render

- Go to https://render.com
- Create a new Web Service
- Set:
  Root Directory: backend
  Build Command: npm install
  Start Command: node app.js
  Environment Variable: OPENAI_API_KEY=your-openai-api-key
- Deploy — copy your Render URL (e.g. https://your-backend.onrender.com)

🔹 Frontend: Netlify

- In frontend/.env: REACT_APP_API_URL=https://your-backend.onrender.com
- Deploy using Netlify:
  Option A: Drag frontend/build to Netlify
  Option B: Connect GitHub and set:
  Build Command: npm run build
  Publish Directory: frontend/build
  Env var: REACT_APP_API_URL=https://your-backend.onrender.com

---

### ⚠️ OpenAI Key Policy

## 🔐 This project does not include an active OpenAI key in production for security reasons.

- To enable full functionality:
- Create your own OpenAI account
- Generate an API key
- Add it to /backend/.env as: OPENAI_API_KEY=your-key

### 💬 FAQ

Q: Why doesn't the chat work on the live site?
A: You need to provide your own OpenAI API key in /backend/.env.

Q: Can I test the app locally with my own key?
A: Yes! Follow the local setup instructions above.

Q: Will we see a broken app?
A: No — the app loads, but OpenAI calls will return a 401 if no key is present.
