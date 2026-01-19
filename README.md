# Topsis-Vani-102303078

## Multi-Criteria Decision Making using TOPSIS

[![Python Version](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI](https://badge.fury.io/py/Topsis-Vani-102303078.svg)](https://pypi.org/project/Topsis-Vani-102303078/)

**Author:** Vani Goyal  
**Roll Number:** 102303078  
**Email:** vgoyal_be23@thapar.edu  

---

## 🔗 Quick Links
- **🌐 Web App:** [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)
## 🚨 **IMPORTANT WARNING** 🚨

> ### ⚠️ **<span style="color: red; font-weight: bold; font-size: 1.2em;">APP MAY BE INACTIVE - CLICK TO REACTIVATE</span>** ⚠️
> 
> **🔴 This app is hosted on a free tier and goes inactive after periods of no use.**
> 
> **If you see "get this app back up" message, CLICK THE BUTTON to reactivate it.**
> 
> ![App Inactive](static/app-state.png)

- **📓 Google Colab:** [https://colab.research.google.com/drive/1ST6ZFCftDDuqpOB5V8KlceaAQF5sS6xq?usp=sharing](https://colab.research.google.com/drive/1ST6ZFCftDDuqpOB5V8KlceaAQF5sS6xq?usp=sharing)
- **📦 PyPI Package:** [https://pypi.org/project/Topsis-Vani-102303078/](https://pypi.org/project/Topsis-Vani-102303078/)
- **💻 GitHub Repository:** [https://github.com/vgalpha/Topsis-Vani-102303078](https://github.com/vgalpha/Topsis-Vani-102303078)

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

## 🤔 What is TOPSIS?

**TOPSIS** stands for **Technique for Order Preference by Similarity to Ideal Solution**. It's a powerful tool that helps you make decisions when you have multiple options and several factors to consider for each option.

Imagine you want to buy a new phone. You might care about its price, camera quality, battery life, and storage space. Each of these is a "criterion". TOPSIS helps you rank the available phones from best to worst based on what's most important to you.

### How does it work?

In simple terms, TOPSIS finds two imaginary "ideal" solutions:

1.  **The Ideal Best:** This is a hypothetical option that has the best possible value for each criterion (e.g., the lowest price, the best camera, the longest battery life).
2.  **The Ideal Worst:** This is a hypothetical option that has the worst possible value for each criterion (e.g., the highest price, the worst camera, the shortest battery life).

Then, TOPSIS measures how close each of your real options is to the "Ideal Best" and how far it is from the "Ideal Worst". The best option is the one that is closest to the Ideal Best and farthest from the Ideal Worst.

---

## 🚀 Applications of TOPSIS

TOPSIS is used in many fields to make better decisions. Here are a few examples:

-   **Finance:** Selecting the best investment portfolio from a list of options based on factors like risk, return, and liquidity.
-   **Supply Chain Management:** Choosing the best supplier for a company by considering criteria like cost, delivery time, and product quality.
-   **Environmental Management:** Ranking different waste management strategies based on their environmental impact, cost, and social acceptance.
-   **Healthcare:** Selecting the best treatment plan for a patient by considering factors like effectiveness, side effects, and cost.
-   **Personal Decisions:** Choosing a new car, a university to attend, or even a place to live.

---

## 🔧 Installation & Usage

### Option 1: Web Application
Visit: [https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/](https://topsis-vani-102303078-devxqkkn7acxr5gvy9krww.streamlit.app/)
<br>

## 🚨 **IMPORTANT WARNING** 🚨

> ### ⚠️ **<span style="color: red; font-weight: bold; font-size: 1.2em;">APP MAY BE INACTIVE - CLICK TO REACTIVATE</span>** ⚠️
> 
> **🔴 This app is hosted on a free tier and goes inactive after periods of no use.**
> 
> **If you see "get this app back up" message, CLICK THE BUTTON to reactivate it.**
> 
> ![App Inactive](static/app-state.png)

<br>

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

Open `topsis.ipynb` in Jupyter or use our **[Google Colab version](https://colab.research.google.com/drive/1ST6ZFCftDDuqpOB5V8KlceaAQF5sS6xq?usp=sharing)** for step-by-step analysis with visualizations.

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
## 🚨 **IMPORTANT WARNING** 🚨

> ### ⚠️ **<span style="color: red; font-weight: bold; font-size: 1.2em;">APP MAY BE INACTIVE - CLICK TO REACTIVATE</span>** ⚠️
> 
> **🔴 This app is hosted on a free tier and goes inactive after periods of no use.**
> 
> **If you see "get this app back up" message, CLICK THE BUTTON to reactivate it.**
> 
> ![App Inactive](static/app-state.png)

- **Google Colab:** [https://colab.research.google.com/drive/1ST6ZFCftDDuqpOB5V8KlceaAQF5sS6xq?usp=sharing](https://colab.research.google.com/drive/1ST6ZFCftDDuqpOB5V8KlceaAQF5sS6xq?usp=sharing)
- **PyPI Package:** [https://pypi.org/project/Topsis-Vani-102303078/](https://pypi.org/project/Topsis-Vani-102303078/)
- **GitHub:** [https://github.com/vgalpha/Topsis-Vani-102303078](https://github.com/vgalpha/Topsis-Vani-102303078)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
