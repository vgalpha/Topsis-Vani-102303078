# TOPSIS Web Service

A hybrid web application combining **Next.js frontend** with **Python backend** for performing TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) multi-criteria decision analysis.

## 🚀 Features

✅ **File Upload**: Support for CSV file uploads  
✅ **Sample CSV Download**: Download example data format  
✅ **Optional Email**: Checkbox to make email sending optional  
✅ **Real-time Calculation**: Instant TOPSIS analysis using proven Python algorithm  
✅ **Email Integration**: Send results via SMTP with your existing package logic  
✅ **Results Download**: Download results as CSV  
✅ **Responsive Design**: Dark theme UI that matches your existing design  

## 🏗️ Architecture

**Hybrid Next.js + Python Architecture:**
- **Frontend:** Modern React/Next.js interface
- **Backend:** Python serverless functions using your proven TOPSIS package
- **Email:** Python SMTP integration (same as Streamlit version)
- **Deployment:** Vercel with both Node.js and Python runtimes

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Inline styles
- **CSV Processing:** Papa Parse
- **File Downloads:** FileSaver.js

### Backend  
- **Runtime:** Python 3.9
- **Dependencies:** pandas, numpy, Topsis-Vani-102303078
- **Email:** smtplib (same as Streamlit version)
- **Platform:** Vercel Serverless Functions

## 📁 Project Structure

```
vercel-app/
├── api/                     # Python serverless functions
│   └── topsis.py           # Main TOPSIS calculation endpoint
├── src/app/                # Next.js frontend
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
├── vercel.json            # Vercel deployment config
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

**Node.js dependencies:**
```bash
npm install
```

**Python dependencies (for local development):**
```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Set up your email credentials in Vercel dashboard or `.env.local`:

```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Development

```bash
npm run dev
```

### 4. Production Build

```bash
npm run build
```

### 5. Deploy to Vercel

```bash
vercel --prod
```

## 💡 Usage

1. **Upload CSV**: First column = option names, remaining = numeric criteria
2. **Enter Weights**: Comma-separated (e.g., `1,1,1,2`)
3. **Enter Impacts**: Comma-separated + or - (e.g., `+,+,-,+`)
4. **Optional Email**: Check box and enter email for results
5. **Calculate**: Click button to process with Python backend
6. **Download**: Get results as CSV file

## 📊 Sample Data Format

```csv
Model,Price,Storage,Camera,Battery
P1,250,64,12,4000
P2,200,32,8,3500
P3,300,128,16,4500
```

- **Weights:** `1,1,1,2` (importance of each criterion)
- **Impacts:** `+,+,-,+` (+ = higher is better, - = lower is better)

## 🧮 TOPSIS Algorithm (Python Backend)

Uses the **exact same algorithm** as your Streamlit version:

1. **Normalization:** Vector normalization of decision matrix
2. **Weighting:** Apply user-defined weights to criteria
3. **Ideal Solutions:** Calculate ideal best and worst solutions
4. **Distance Calculation:** Euclidean distances to ideal solutions
5. **TOPSIS Score:** Relative closeness to ideal solution (0-100)
6. **Ranking:** Sort alternatives by TOPSIS score

## 📧 Email Integration

- **SMTP Configuration:** Uses your existing Gmail SMTP setup
- **Environment Variables:** `SMTP_EMAIL` and `SMTP_PASSWORD`
- **Email Content:** Same format as Streamlit version with CSV attachment
- **Fallback:** If email fails, user can still download results

## 🔧 Deployment Notes

- **Free Tier Compatible:** Runs on Vercel's free tier
- **Python Runtime:** `@vercel/python` handles Python functions
- **Dependencies:** Automatically installs from `requirements.txt`
- **Environment Variables:** Set in Vercel dashboard for production

## 👨‍💻 Author

**Vani Goyal**  
Roll No: 102303078  
Thapar Institute of Engineering & Technology

## 📝 License

MIT License