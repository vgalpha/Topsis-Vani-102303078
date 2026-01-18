# 🌐 TOPSIS Web Service

Web application for TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) analysis.

**Author:** Vani Goyal  
**Roll Number:** 102303078  
**Email:** vgoyal_be23@thapar.edu

---

## 🚀 Live Demo

**Deployed Application:** [Your Streamlit App URL]

*(Update this after deployment)*

---

## ✨ Features

- 📤 **File Upload:** Support for CSV and Excel files
- ⚙️ **Parameter Input:** Interactive weights and impacts configuration
- ✅ **Validation:** Comprehensive input validation
- 📊 **TOPSIS Calculation:** Real-time multi-criteria analysis
- 📧 **Email Delivery:** Automatic email of results (optional)
- ⬇️ **Download:** Direct CSV download of results
- 🎨 **User-Friendly:** Clean, intuitive interface

---

## 📋 How to Use

### 1. Upload Data File
- Click "Browse files" or drag & drop
- Supported formats: CSV, XLSX, XLS
- First column: Alternative names
- Remaining columns: Numeric criteria values

### 2. Enter Parameters

**Weights** (comma-separated positive numbers):
```
Example: 1,1,1,2
```

**Impacts** (comma-separated + or -):
```
Example: +,+,-,+
+ means maximize (higher is better)
- means minimize (lower is better)
```

### 3. Provide Email
```
your.email@example.com
```

### 4. Calculate & Send
- Click the button
- View results instantly
- Download CSV
- Receive email (if configured)

---

## 📊 Input Format

### Example CSV:
```csv
Fund Name,P1,P2,P3,P4
M1,0.84,0.71,6.7,42.1
M2,0.91,0.83,7.0,31.7
M3,0.79,0.62,4.8,46.7
```

### Parameters:
- **Weights:** `1,1,1,1`
- **Impacts:** `+,+,-,+`

### Output:
```csv
Fund Name,P1,P2,P3,P4,Topsis Score,Rank
M1,0.84,0.71,6.7,42.1,45.23,2
M2,0.91,0.83,7.0,31.7,38.67,3
M3,0.79,0.62,4.8,46.7,52.18,1
```

---

## 🛠️ Local Development

### Prerequisites
- Python 3.7+
- pip

### Setup

```bash
# Clone repository
git clone https://github.com/vgalpha/Topsis-Vani-102303078
cd Topsis-Vani-102303078/web-service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run application
streamlit run app.py
```

Application opens at: http://localhost:8501

---

## 📦 Dependencies

```
streamlit==1.29.0
pandas==2.1.4
numpy==1.26.2
openpyxl==3.1.2
```

---

## 🚀 Deployment

Deployed on **Streamlit Cloud** (free hosting)

### Steps:
1. Push code to GitHub
2. Sign up at https://streamlit.io/cloud
3. Connect GitHub repository
4. Deploy `web-service/app.py`
5. Get your app URL

**Detailed guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## ✅ Validations

The app validates:
- ✓ File format (CSV/Excel)
- ✓ Minimum 3 columns
- ✓ Numeric values in criteria columns
- ✓ Weights count = Impacts count = Criteria count
- ✓ Weights are positive numbers
- ✓ Impacts are only '+' or '-'
- ✓ Comma-separated format
- ✓ Valid email format

---

## 📧 Email Configuration (Optional)

Email delivery is **optional**. Users can download results directly.

To enable email:
1. Set up Gmail app password
2. Add to Streamlit secrets:
   ```toml
   SMTP_EMAIL = "your.email@gmail.com"
   SMTP_PASSWORD = "your-app-password"
   ```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

---

## 🎨 Interface

- **Clean Design:** Professional, easy-to-use interface
- **Responsive:** Works on desktop and mobile
- **Real-time Feedback:** Instant validation messages
- **Progress Indicators:** Loading states for long operations
- **Data Preview:** See uploaded data before processing
- **Results Display:** Clear presentation of scores and ranks

---

## 🔧 Technology Stack

- **Framework:** Streamlit
- **Data Processing:** Pandas, NumPy
- **File Handling:** Openpyxl (Excel support)
- **Email:** SMTP (Gmail)
- **Deployment:** Streamlit Cloud

---

## 📚 Documentation

- **Main Repository:** [GitHub](https://github.com/vgalpha/Topsis-Vani-102303078)
- **PyPI Package:** [Topsis-Vani-102303078](https://pypi.org/project/Topsis-Vani-102303078/)
- **Deployment Guide:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 👩‍💻 Author

**Vani Goyal**
- Roll Number: 102303078
- Institution: Thapar Institute of Engineering & Technology
- Email: vgoyal_be23@thapar.edu
- GitHub: [@vgalpha](https://github.com/vgalpha)

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) file

---

## 🙏 Acknowledgments

- Streamlit for amazing framework
- Thapar Institute for assignment
- Open-source community

---

**Last Updated:** January 2025  
**Version:** 1.0.0
