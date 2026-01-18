# Topsis-Vani-102303078

## Multi-Criteria Decision Making using TOPSIS

[![Python Version](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI](https://badge.fury.io/py/Topsis-Vani-102303078.svg)](https://pypi.org/project/Topsis-Vani-102303078/)

**Author:** Vani Goyal  
**Roll Number:** 102303078  
**Email:** vgoyal_be23@thapar.edu  

## 🔗 Quick Links

- **🌐 Web App:** [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)
- **📦 PyPI Package:** [https://pypi.org/project/Topsis-Vani-102303078/](https://pypi.org/project/Topsis-Vani-102303078/)
- **💻 GitHub Repository:** [https://github.com/vgalpha/Topsis-Vani-102303078](https://github.com/vgalpha/Topsis-Vani-102303078)

---

## 🎯 What is TOPSIS?

**TOPSIS** (Technique for Order Preference by Similarity to Ideal Solution) is a multi-criteria decision analysis method that helps identify the best alternative from a set of options based on multiple criteria.

The algorithm finds the alternative closest to the ideal solution and farthest from the negative-ideal solution using geometric distance.

---

## 🚀 Try it Online

**🌐 Web App:** [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)

Upload your data and get TOPSIS results instantly with visualizations!

---

## 📁 Repository Contents

```
Topsis-Vani-102303078/
├── topsis.py              # Command-line implementation
├── topsis.ipynb           # Jupyter/Colab notebook with visualizations
├── test_data/             # Test data directory
│   ├── data.xlsx          # Test data (Excel format)
│   ├── data.csv           # Test data (CSV format)
│   └── result.csv         # Example output
├── requirements.txt       # Python dependencies
├── web-service/           # Streamlit web application
└── Topsis-Vani-102303078/ # PyPI package directory
```

---

## 🔧 Installation & Usage

### Option 1: Web Application
Visit: [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)

### Option 2: Command Line Interface

#### Installation
```bash
pip install Topsis-Vani-102303078
```

#### Usage
```bash
topsis <InputDataFile> <Weights> <Impacts> <OutputFileName>
```

#### Example
```bash
topsis test_data/data.csv "1,1,1,1,1" "+,+,-,+,+" test_data/result.csv
```

### Option 3: Python Module

```python
from topsis_vani_102303078 import topsis

# Run TOPSIS
topsis('test_data/data.csv', '1,1,1,1,1', '+,+,-,+,+', 'test_data/result.csv')
```

### Option 4: Jupyter Notebook

Open `topsis.ipynb` in Jupyter or Google Colab for step-by-step analysis with visualizations.

---

## 📊 Algorithm Steps

1. **Normalization** - Convert decision matrix to comparable scales
2. **Weighted Normalization** - Apply criterion weights
3. **Ideal Solutions** - Identify ideal best and worst solutions
4. **Distance Calculation** - Calculate Euclidean distances
5. **TOPSIS Score** - Calculate closeness coefficient (0-100)
6. **Ranking** - Rank alternatives by score

---

## 📈 Example Results

Sample data with 8 mutual funds (M1-M8) evaluated on 5 criteria:

| Fund | P1   | P2   | P3  | P4   | P5    | **Score** | **Rank** |
|------|------|------|-----|------|-------|-----------|----------|
| M5   | 0.94 | 0.88 | 3.6 | 62.2 | 16.91 | **97.21** | **1** ⭐ |
| M8   | 0.93 | 0.86 | 3.4 | 37.0 | 10.55 | **56.01** | **2**    |
| M6   | 0.88 | 0.77 | 6.5 | 51.5 | 14.91 | **54.70** | **3**    |

**Parameters:** Weights=[1,1,1,1,1], Impacts=[+,+,-,+,+]

---

## ✅ Input Format

- **CSV/Excel file** with alternatives in rows, criteria in columns
- **First column:** Alternative names
- **Remaining columns:** Numeric criteria values
- **Weights:** Comma-separated numbers (e.g., "1,2,1,3")
- **Impacts:** Comma-separated +/- signs (e.g., "+,+,-,+")

---

## 🔗 Links

- **Web App:** [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)
- **PyPI Package:** [https://pypi.org/project/Topsis-Vani-102303078/](https://pypi.org/project/Topsis-Vani-102303078/)
- **GitHub:** [https://github.com/vgalpha/Topsis-Vani-102303078](https://github.com/vgalpha/Topsis-Vani-102303078)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.