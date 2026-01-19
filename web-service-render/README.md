# TOPSIS Web Service - Render Deployment

A Streamlit web application for TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) multi-criteria decision making analysis, optimized for deployment on Render.

## Features

- Upload CSV/Excel files with decision matrix data
- Configure weights and impacts for criteria
- Automated TOPSIS calculation
- Email results functionality
- Download results as CSV
- Responsive web interface

## Deployment on Render

### Prerequisites

1. GitHub repository with this code
2. Render account (free)

### Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: `topsis-web-service`
     - **Runtime**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `streamlit run app.py --server.headless true --server.enableCORS false --server.enableXsrfProtection false --server.port $PORT`
     - **Plan**: Free

3. **Environment Variables** (Optional):
   - `SMTP_EMAIL`: For email functionality
   - `SMTP_PASSWORD`: Email password/app password

### File Structure

```
web-service-render/
├── app.py              # Main Streamlit application
├── requirements.txt    # Python dependencies
├── render.yaml        # Render configuration (optional)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

### Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   streamlit run app.py
   ```

3. Open http://localhost:8501 in your browser

## Usage

1. Upload a CSV/Excel file with:
   - Column 1: Alternative names
   - Columns 2+: Numeric criteria values

2. Enter weights (comma-separated positive numbers)

3. Enter impacts (comma-separated + or - signs)

4. Provide email address

5. Click "Calculate TOPSIS & Send Results"

## Example Data Format

| Fund | P1   | P2   | P3  | P4   |
|------|------|------|-----|------|
| M1   | 0.84 | 0.71 | 6.7 | 42.1 |
| M2   | 0.91 | 0.83 | 7.0 | 31.7 |
| M3   | 0.79 | 0.62 | 4.8 | 46.7 |

- Weights: `1,1,1,1`
- Impacts: `+,+,-,+`

## Notes

- Free tier on Render sleeps after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- SMTP credentials required for email functionality
- All data processing happens securely on the server

## Author

**Vani Goyal**  
Roll No: 102303078  
Thapar Institute of Engineering & Technology  
Email: vgoyal_be23@thapar.edu