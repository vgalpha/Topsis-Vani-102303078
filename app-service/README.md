# TOPSIS Web Service

A modern web application for TOPSIS analysis with hybrid architecture:
- **Frontend**: Next.js with TypeScript (modern, responsive UI)
- **Backend**: Python serverless functions (uses your proven TOPSIS logic)

## 📁 Project Structure

```
app-service/
├── frontend/           # Next.js web application
│   ├── src/app/       # React components and pages
│   ├── api/           # Python serverless functions
│   ├── package.json   # Node.js dependencies
│   └── requirements.txt # Python dependencies
└── backend/           # Original Streamlit app (for reference)
    └── app.py         # Streamlit implementation
```

## 🚀 Quick Start

### Frontend (Next.js + Python API)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Streamlit - for reference)

```bash
cd backend  
pip install -r requirements.txt
streamlit run app.py
```

## 🌐 Deployment

The frontend is ready for Vercel deployment with both Node.js and Python runtimes.

```bash
cd frontend
vercel --prod
```

## ✨ Features

- ✅ Modern responsive UI with standard font sizes and spacing
- ✅ Python backend using your existing TOPSIS algorithm
- ✅ Optional email functionality
- ✅ Sample CSV download
- ✅ Real-time validation and error handling
- ✅ Professional design following modern web standards

## 💻 Development

The app uses your existing Python TOPSIS logic via serverless functions, ensuring reliability while providing a modern web interface.