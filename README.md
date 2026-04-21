# 🧠 AI Document Intelligence System (LLM + RAG)

An AI-powered system that allows users to upload documents and ask intelligent questions using Retrieval-Augmented Generation with voice interaction.

👉 First impression matters

🟣 2. 🚀 Features
## 🚀 Features

- 📄 Upload documents (PDF, DOCX, TXT)
- 🤖 RAG-based question answering
- 🔍 Semantic search using FAISS
- 🎤 Voice input (Speech-to-Text)
- ⚡ FastAPI backend + React frontend

👉 Keep it simple + impactful

🟣 3. 🧠 Tech Stack
## 🧠 Tech Stack

### Backend
- Python, FastAPI
- LangChain
- FAISS (Vector DB)
- HuggingFace Transformers

### Frontend
- React (Vite)
- Tailwind CSS

### AI & Voice
- SentenceTransformers
- SpeechRecognition
- Web Speech API
🟣 4. 🎥 Demo (VERY IMPORTANT)
## 🎥 Demo

[Watch Demo Video]

👉 Add:

YouTube OR Google Drive link
🟣 5. 🏗️ Project Structure
## 🏗️ Project Structure

AI-Intelligent-Document-Qns-Ans/
│
├── backend/
│   ├── utils/
│   ├── main.py
│   ├── rag_engine.py
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── requirements.txt
└── README.md
🟣 6. ⚙️ Installation & Setup
## ⚙️ Installation & Setup

### 1. Clone the repository
git clone https://github.com/your-username/AI-Intelligent-Document-Qns-Ans.git

### 2. Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### 3. Frontend setup
cd frontend
npm install
npm run dev
🟣 7. 💡 How It Works
## 💡 How It Works

1. User uploads a document
2. Text is extracted and split into chunks
3. Embeddings are created using SentenceTransformers
4. Stored in FAISS vector database
5. User asks a question
6. Relevant context is retrieved
7. LLM generates answer based on context

👉 This part impresses interviewers a LOT

🟣 8. 🚀 Future Improvements
## 🚀 Future Improvements

- Add authentication system
- Deploy on cloud
- Support multiple documents
- Improve UI/UX
🟣 9. 👨‍💻 Author
## 👨‍💻 Author

Chandan Kheto  
AI/ML Enthusiast  
