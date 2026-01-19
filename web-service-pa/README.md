# TOPSIS Web Service - PythonAnywhere Deployment

This directory contains the PythonAnywhere-ready version of the TOPSIS Streamlit web application.

## About

**TOPSIS** (Technique for Order Preference by Similarity to Ideal Solution) is a multi-criteria decision-making method. This web service allows users to upload data, configure parameters, and receive analysis results via email.

**Author:** Vani Goyal  
**Roll No:** 102303078  
**Email:** vgoyal_be23@thapar.edu

## Files

- `streamlit_app.py` - Main Streamlit application (PythonAnywhere compatible)
- `requirements.txt` - Python dependencies
- `deploy.sh` - Deployment script for PythonAnywhere
- `README.md` - This file

## Local Testing

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the app:
```bash
streamlit run streamlit_app.py
```

## PythonAnywhere Deployment

### Prerequisites

- PythonAnywhere account (Hacker tier or higher for Streamlit support)
- API token generated from PythonAnywhere dashboard

### Deployment Steps

1. **Install PythonAnywhere CLI tools:**
```bash
pip install --upgrade pythonanywhere
```

2. **Create virtual environment:**
```bash
mkvirtualenv topsis_env --python=python3.13
pip install -r requirements.txt
```

3. **Upload files to PythonAnywhere:**
   - Upload `streamlit_app.py` and `requirements.txt` to `~/topsis/`
   - Or use git to clone this repository

4. **Deploy using PythonAnywhere CLI:**
```bash
pa website create --domain YOURUSERNAME.pythonanywhere.com --command '/home/YOURUSERNAME/.virtualenvs/topsis_env/bin/streamlit run /home/YOURUSERNAME/topsis/streamlit_app.py --server.address "unix://${DOMAIN_SOCKET}" --server.enableCORS false --server.enableXsrfProtection false --server.enableWebsocketCompression false'
```

Replace `YOURUSERNAME` with your PythonAnywhere username.

### Management Commands

- **Check website status:**
```bash
pa website get
```

- **Reload website:**
```bash
pa website reload --domain YOURUSERNAME.pythonanywhere.com
```

- **Delete website:**
```bash
pa website delete --domain YOURUSERNAME.pythonanywhere.com
```

## Features

- Upload CSV/Excel files with decision matrix data
- Configure weights and impacts for criteria
- Perform TOPSIS analysis
- Email results to users
- Download results as CSV
- Responsive web interface

## Input Format

Your data file should have:
- Column 1: Alternative names
- Columns 2-N: Numeric criteria values

Example:
```csv
Fund,P1,P2,P3,P4
M1,0.84,0.71,6.7,42.1
M2,0.91,0.83,7.0,31.7
M3,0.79,0.62,4.8,46.7
```

For this data:
- Weights: `1,1,1,1`
- Impacts: `+,+,-,+` (higher values are better for P1, P2, P4; lower values are better for P3)

## Environment Variables (Required for Email)

For email functionality, you must set these environment variables on PythonAnywhere:

### Method 1: Using .bashrc (Recommended)
```bash
# SSH into PythonAnywhere console and run:
echo 'export SMTP_EMAIL="your_email@gmail.com"' >> ~/.bashrc
echo 'export SMTP_PASSWORD="your_app_password"' >> ~/.bashrc
source ~/.bashrc
```

### Method 2: Using PythonAnywhere Files tab
1. Go to Files tab in PythonAnywhere dashboard
2. Edit `~/.bashrc` file
3. Add the export statements at the end
4. Restart your console or run `source ~/.bashrc`

### Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated app password (not your regular Gmail password)

### Variables:
- `SMTP_EMAIL` - Your Gmail address (e.g., `your.email@gmail.com`)
- `SMTP_PASSWORD` - Your Gmail app password (16-character code)

If not set, users can still download results without email delivery.

## Important Notes

- PythonAnywhere Streamlit support is currently in beta
- No static file mappings supported
- Limited web UI for management
- Use command-line tools for deployment and management

## Support

For issues:
- Check PythonAnywhere documentation: https://help.pythonanywhere.com/pages/Streamlit/
- Contact support for PythonAnywhere-specific issues
- For app-specific issues, check the main repository