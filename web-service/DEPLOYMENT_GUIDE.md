# 🚀 TOPSIS Web Service Deployment Guide

Complete guide to deploy your TOPSIS web service on **Streamlit Cloud** (free hosting).

---

## 📋 Prerequisites

- GitHub account (you already have: vgalpha)
- Streamlit Cloud account (free - we'll create)
- Your web service files (provided)

---

## ⚡ Quick Deployment (15 minutes)

### Step 1: Add Web Service to Your GitHub Repo (5 min)

```bash
# Navigate to your GitHub repo
cd /path/to/Topsis-Vani-102303078

# Create web-service directory
mkdir web-service
cd web-service

# Copy all web service files here:
# - app.py
# - requirements.txt
# - .streamlit/config.toml

# Add to git
git add web-service/
git commit -m "Add TOPSIS web service

- Add Streamlit web application
- Add file upload interface
- Add email functionality
- Add all required validations"

# Push
git push origin main
```

### Step 2: Sign Up for Streamlit Cloud (3 min)

1. Go to: https://streamlit.io/cloud
2. Click **"Sign up"** or **"Get started"**
3. Choose **"Continue with GitHub"**
4. Authorize Streamlit to access your GitHub
5. ✅ You're in!

### Step 3: Deploy Your App (5 min)

1. **In Streamlit Cloud Dashboard:**
   - Click **"New app"**

2. **Configure deployment:**
   ```
   Repository: vgalpha/Topsis-Vani-102303078
   Branch: main
   Main file path: web-service/app.py
   ```

3. **Click "Deploy!"**

4. **Wait 2-3 minutes** while it deploys...

5. **✅ Done!** You'll get a URL like:
   ```
   https://topsis-vani-102303078.streamlit.app
   ```

### Step 4: Update Your README (2 min)

Add this section to your GitHub README:

```markdown
## 🌐 Web Service (Part-III)

**Live Demo:** https://your-app-name.streamlit.app

### Features:
- Upload CSV/Excel files
- Enter weights and impacts
- Validate all inputs
- Calculate TOPSIS scores
- Email results automatically
- Download results as CSV

### Usage:
1. Visit the web service link above
2. Upload your data file
3. Enter weights (comma-separated)
4. Enter impacts (+/- for each criterion)
5. Provide your email address
6. Click "Calculate & Send"
7. Receive results via email or download directly
```

---

## 📁 File Structure

Your repo should look like this:

```
Topsis-Vani-102303078/
├── topsis.py
├── topsis.ipynb
├── data.xlsx
├── data.csv
├── result.csv
├── requirements.txt
├── README.md
├── package/
│   └── Topsis-Vani-102303078/  # PyPI package
└── web-service/                # NEW
    ├── app.py
    ├── requirements.txt
    └── .streamlit/
        └── config.toml
```

---

## 🔧 Detailed Setup Instructions

### Local Testing (Before Deployment)

```bash
# Navigate to web-service directory
cd web-service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run locally
streamlit run app.py

# Opens in browser at: http://localhost:8501
```

### Streamlit Cloud Settings

After deploying, configure these (optional):

1. **Custom URL:** 
   - Go to app settings
   - Change URL to: `topsis-vani-102303078`

2. **Secrets (for Email):**
   - Go to app settings → Secrets
   - Add (if you want email to work):
   ```toml
   SMTP_EMAIL = "your.email@gmail.com"
   SMTP_PASSWORD = "your-app-password"
   ```
   **Note:** Email is optional - users can download results

---

## 📧 Email Configuration (Optional)

The app works **without** email configuration - users can download results directly.

If you want to enable email:

### Option A: Use Gmail (Recommended)

1. **Enable 2-Step Verification:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → "TOPSIS App"
   - Click "Generate"
   - Copy the 16-character password

3. **Add to Streamlit Secrets:**
   - In Streamlit Cloud → App Settings → Secrets
   - Add:
   ```toml
   SMTP_EMAIL = "your.gmail@gmail.com"
   SMTP_PASSWORD = "your-16-char-app-password"
   ```

### Option B: Skip Email (Easiest)

- Don't configure email
- Users can still download results as CSV
- Works perfectly for assignment submission

---

## ✅ Testing Your Deployed App

1. **Visit your app URL**

2. **Test with sample data:**
   - Upload the `data.xlsx` from your repo
   - Weights: `1,1,1,1,1`
   - Impacts: `+,+,-,+,+`
   - Email: your email
   - Click "Calculate & Send"

3. **Verify:**
   - ✅ Results table appears
   - ✅ Can download CSV
   - ✅ (If email configured) Receives email

---

## 🐛 Troubleshooting

### Issue: "App is not loading"

```
Solution:
1. Check Streamlit Cloud logs
2. Verify requirements.txt has all dependencies
3. Check app.py has no syntax errors
```

### Issue: "Module not found"

```
Solution:
1. Add missing module to requirements.txt
2. Redeploy (Streamlit auto-redeploys on git push)
```

### Issue: "File upload not working"

```
Solution:
1. Check file size < 200MB
2. Verify file format (CSV or Excel)
3. Check first column has names, rest numeric
```

### Issue: "Email not sending"

```
Solution:
1. This is OK - download feature works
2. If needed, configure SMTP secrets
3. Or just tell users to download results
```

---

## 🎯 Deployment Checklist

- [ ] Web service files in `web-service/` directory
- [ ] Files committed to GitHub
- [ ] Streamlit Cloud account created
- [ ] App deployed successfully
- [ ] App URL working
- [ ] Tested with sample data
- [ ] README updated with web service link
- [ ] (Optional) Email configured

---

## 🔄 Updating Your App

Whenever you make changes:

```bash
# Edit app.py
# Commit and push
git add web-service/
git commit -m "Update web service"
git push origin main

# Streamlit Cloud auto-redeploys in ~2 minutes!
```

---

## 📊 App URL Format

Your app will be available at:

```
https://[repo-name]-[random-string].streamlit.app

Example:
https://topsis-vani-102303078-abc123def456.streamlit.app

You can customize the first part in settings!
```

---

## 💡 Tips

1. **App URL:** Keep it short and memorable
2. **README:** Always include the live link
3. **Testing:** Test thoroughly before submitting
4. **Screenshots:** Consider adding screenshots to README
5. **Monitoring:** Check Streamlit Cloud dashboard for usage stats

---

## 🎓 For Your Submission

**What to include in README:**

```markdown
## Part-III: Web Service

**Live Application:** [https://your-app-url.streamlit.app](https://your-app-url.streamlit.app)

**Features:**
- File upload (CSV/Excel)
- Interactive parameter input
- Real-time validation
- TOPSIS calculation
- Email delivery
- CSV download
```

---

## ✨ You're All Set!

After deployment:
1. ✅ Test your app
2. ✅ Add URL to README
3. ✅ Commit changes
4. ✅ Submit!

**Your complete assignment is now deployed and accessible online!** 🎉

---

**Need help?** Check Streamlit docs: https://docs.streamlit.io/

**App deployed by:** Vani Goyal (102303078)
