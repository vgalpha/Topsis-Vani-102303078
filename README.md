# Topsis-Vani-102303078

## Multi-Criteria Decision Making using TOPSIS

[![Python Version](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PyPI](https://badge.fury.io/py/Topsis-Vani-102303078.svg)](https://pypi.org/project/Topsis-Vani-102303078/)

**Author:** Vani Goyal  
**Roll Number:** 102303078  
**Email:** vgoyal_be23@thapar.edu  
**GitHub:** [@vgalpha](https://github.com/vgalpha)  
**Institution:** Thapar Institute of Engineering & Technology

---

## 📁 Repository Contents

```
Topsis-Vani-102303078/
├── topsis.py              # Command-line implementation
├── topsis.ipynb           # Jupyter/Colab notebook with visualizations
├── data.xlsx              # Test data (Excel format)
├── data.csv               # Test data (CSV format)
├── result.csv             # Example output
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
└── Topsis-Vani-102303078/ # PyPI package directory
    ├── topsis_vani_102303078/
    │   ├── __init__.py
    │   └── topsis.py
    ├── setup.py
    ├── README.md
    └── LICENSE
```

---

## 🎯 What is TOPSIS?

**TOPSIS** (Technique for Order Preference by Similarity to Ideal Solution) is a multi-criteria decision analysis method that helps identify the best alternative from a set of options based on multiple criteria.

### Key Concept
- Finds the alternative **closest to the ideal solution** (best possible)
- Finds the alternative **farthest from the negative-ideal solution** (worst possible)
- Uses **geometric distance** to measure similarity

---

## 📊 Methodology

### Mathematical Formulation

Given:
- **m** alternatives (options to choose from)
- **n** criteria (factors to consider)
- **Decision matrix X** = [x_ij] where x_ij is the performance of alternative i on criterion j
- **Weight vector W** = [w1, w2, ..., wn] indicating importance of each criterion
- **Impact vector I** = [i1, i2, ..., in] where ij ∈ {+, -}

### Algorithm Steps

#### **Step 1: Normalization**

Convert the decision matrix to a normalized matrix using vector normalization:

```
r_ij = x_ij / √(Σ(x_kj)²) for k=1 to m
```

**Purpose:** Bring all criteria to a comparable scale (0 to 1)

**Example:**
```
Original Matrix:          Normalized Matrix:
P1    P2    P3           P1      P2      P3
0.84  0.71  6.7    →    0.4147  0.3756  0.5021
0.91  0.83  7.0         0.4491  0.4391  0.5246
```

#### **Step 2: Weighted Normalized Matrix**

Apply criterion weights to normalized values:

```
v_ij = w_j × r_ij
```

**Purpose:** Reflect the relative importance of each criterion

**Example (weights = [1, 1, 1, 1, 1]):**
```
Weighted Matrix = Normalized Matrix × Weights
(Equal weights mean all criteria are equally important)
```

#### **Step 3: Ideal Solutions**

Determine ideal best (V+) and ideal worst (V-) solutions:

For each criterion j:
```
If impact = '+' (benefit):
    V+_j = max(v_ij)    # Higher is better
    V-_j = min(v_ij)    # Lower is worse
    
If impact = '-' (cost):
    V+_j = min(v_ij)    # Lower is better
    V-_j = max(v_ij)    # Higher is worse
```

**Example:**
```
Criteria:    P1(+)  P2(+)  P3(-)  P4(+)  P5(+)
V+ (Best):   0.465  0.465  0.255  0.494  0.511
V- (Worst):  0.326  0.232  0.525  0.252  0.305
```

#### **Step 4: Distance Calculation**

Calculate Euclidean distance from ideal solutions:

```
S+_i = √(Σ(v_ij - V+_j)²)    # Distance from ideal best
S-_i = √(Σ(v_ij - V-_j)²)    # Distance from ideal worst
```

**Purpose:** Quantify how close each alternative is to the ideal solutions

#### **Step 5: TOPSIS Score**

Calculate the closeness coefficient:

```
C_i = S-_i / (S+_i + S-_i)
```

**Range:** 0 to 1 (scaled to 0-100 for readability)
- **C_i = 1** (100): Alternative is identical to ideal solution
- **C_i = 0** (0): Alternative is identical to negative-ideal solution
- **Higher score = Better alternative**

#### **Step 6: Ranking**

Sort alternatives by TOPSIS score in descending order:
- **Rank 1** = Highest score (best alternative)
- **Rank m** = Lowest score (worst alternative)

---

## 📈 Results Analysis

### Test Data

The repository includes sample data with 8 mutual funds (M1-M8) evaluated on 5 criteria (P1-P5):

| Fund Name | P1   | P2   | P3  | P4   | P5    |
|-----------|------|------|-----|------|-------|
| M1        | 0.84 | 0.71 | 6.7 | 42.1 | 12.59 |
| M2        | 0.91 | 0.83 | 7.0 | 31.7 | 10.11 |
| M3        | 0.79 | 0.62 | 4.8 | 46.7 | 13.23 |
| M4        | 0.78 | 0.61 | 6.4 | 42.4 | 12.55 |
| M5        | 0.94 | 0.88 | 3.6 | 62.2 | 16.91 |
| M6        | 0.88 | 0.77 | 6.5 | 51.5 | 14.91 |
| M7        | 0.66 | 0.44 | 5.3 | 48.9 | 13.83 |
| M8        | 0.93 | 0.86 | 3.4 | 37.0 | 10.55 |

### Parameters Used

- **Weights:** [1, 1, 1, 1, 1] (Equal importance for all criteria)
- **Impacts:** [+, +, -, +, +]
  - **P1, P2, P4, P5:** Maximize (higher is better)
  - **P3:** Minimize (lower is better)

### Final Results Table

| Fund Name | P1   | P2   | P3  | P4   | P5    | **Topsis Score** | **Rank** |
|-----------|------|------|-----|------|-------|------------------|----------|
| **M5**    | 0.94 | 0.88 | 3.6 | 62.2 | 16.91 | **97.21**        | **1** ⭐ |
| **M8**    | 0.93 | 0.86 | 3.4 | 37.0 | 10.55 | **56.01**        | **2**    |
| **M6**    | 0.88 | 0.77 | 6.5 | 51.5 | 14.91 | **54.70**        | **3**    |
| M3        | 0.79 | 0.62 | 4.8 | 46.7 | 13.23 | 49.64            | 4        |
| M7        | 0.66 | 0.44 | 5.3 | 48.9 | 13.83 | 39.50            | 5        |
| M1        | 0.84 | 0.71 | 6.7 | 42.1 | 12.59 | 38.21            | 6        |
| M2        | 0.91 | 0.83 | 7.0 | 31.7 | 10.11 | 36.65            | 7        |
| M4        | 0.78 | 0.61 | 6.4 | 42.4 | 12.55 | 32.48            | 8        |

### Key Findings

1. **Best Alternative: M5** (Score: 97.21)
   - Highest values on P1, P2, P4, P5 (benefit criteria)
   - Low value on P3 (cost criterion)
   - Clear winner with significant gap from second place

2. **Worst Alternative: M4** (Score: 32.48)
   - Low performance across multiple criteria
   - Highest gap from ideal solution

3. **Score Distribution:**
   - Range: 64.73 points (97.21 - 32.48)
   - Mean: 50.55
   - Standard Deviation: 20.23
   - Clear separation between top 3 and bottom 5 alternatives

### Statistical Summary

```
TOPSIS Score Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Count:    8
Mean:     50.55
Std Dev:  20.23
Min:      32.48 (M4)
25%:      38.63
50%:      44.57
75%:      54.98
Max:      97.21 (M5)
```

---

## 📊 Visualizations

The Jupyter notebook (`topsis.ipynb`) includes these visualizations:

### 1. TOPSIS Scores Bar Chart
- Horizontal bar chart showing all alternatives
- Color-coded by performance (green = high, red = low)
- Displays scores and ranks

### 2. Distance Analysis
- Left: Bar chart comparing distances from ideal best vs. worst
- Right: Pie chart showing rank distribution

### 3. Performance Heatmap
- Shows weighted performance across all criteria
- Darker colors indicate better performance
- Helps identify strengths/weaknesses

### 4. Radar Chart (Top 3)
- Compares top 3 alternatives across all criteria
- Easy visual comparison of performance profiles

To generate these graphs:
1. Open `topsis.ipynb` in Jupyter or Google Colab
2. Run all cells
3. Visualizations will be generated automatically

---

## 🚀 Usage

### Option 1: Command Line Interface

#### Installation
```bash
pip install Topsis-Vani-102303078
```

#### Basic Usage
```bash
topsis <InputDataFile> <Weights> <Impacts> <OutputFileName>
```

#### Example
```bash
topsis data.csv "1,1,1,1,1" "+,+,-,+,+" result.csv
```

#### Parameter Format
- **Weights:** Comma-separated numbers (e.g., `"1,2,1,3,1"`)
- **Impacts:** Comma-separated +/- signs (e.g., `"+,+,-,+,+"`)

### Option 2: Python Module

```python
from topsis_vani_102303078 import topsis

# Run TOPSIS
topsis('data.csv', '1,1,1,1,1', '+,+,-,+,+', 'result.csv')

# Output: Result saved to result.csv
```

### Option 3: Jupyter Notebook

1. **Open in Google Colab:**
   - Upload `topsis.ipynb`
   - Upload `data.csv` or `data.xlsx`
   - Run all cells

2. **Local Jupyter:**
   ```bash
   pip install jupyter pandas numpy matplotlib seaborn
   jupyter notebook topsis.ipynb
   ```

3. **Features:**
   - Step-by-step explanation
   - Intermediate results display
   - Automatic visualizations
   - Statistical analysis

---

## 🔧 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip package manager

### Method 1: Install from PyPI
```bash
pip install Topsis-Vani-102303078
```

### Method 2: Install from Source
```bash
git clone https://github.com/vgalpha/Topsis-Vani-102303078
cd Topsis-Vani-102303078
pip install -r requirements.txt
pip install -e .
```

### Dependencies
```
pandas >= 1.0.0
numpy >= 1.18.0
openpyxl >= 3.0.0  (for Excel support)
matplotlib >= 3.3.0  (for visualizations)
seaborn >= 0.11.0  (for advanced plots)
```

---

## ✅ Validation & Error Handling

The implementation includes comprehensive validation:

| Check | Error Message |
|-------|--------------|
| Parameter count | "Incorrect number of parameters" |
| File existence | "File not found" |
| Column count | "Input file must contain three or more columns" |
| Numeric values | "Columns must contain numeric values only" |
| Count matching | "Number of weights/impacts must equal criteria count" |
| Impact values | "Impacts must be either '+' or '-' only" |
| Format | "Weights and impacts must be comma-separated" |
| Weight values | "Weights must be positive numbers" |

---

## 🧪 Testing

### Run Tests
```bash
# Test with provided data
python topsis.py data.csv "1,1,1,1,1" "+,+,-,+,+" test_output.csv

# Verify output
cat test_output.csv
```

### Expected Output
```
Success: TOPSIS result saved to 'test_output.csv'
```

### Test Cases

1. **Equal Weights:**
   ```bash
   topsis data.csv "1,1,1,1,1" "+,+,-,+,+" result1.csv
   ```

2. **Different Weights:**
   ```bash
   topsis data.csv "2,1,3,1,2" "+,+,-,+,+" result2.csv
   ```

3. **All Maximize:**
   ```bash
   topsis data.csv "1,1,1,1,1" "+,+,+,+,+" result3.csv
   ```

---

## 📚 Additional Resources

### Learn TOPSIS
- [Video Tutorial 1](https://www.youtube.com/watch?v=kfcN7MuYVeI) - Concept explanation
- [Video Tutorial 2](https://www.youtube.com/watch?v=9P9Gs8o9oHk) - Step-by-step example

### Python Packaging
- [Medium Guide](https://medium.com/@joel.barmettler/how-to-upload-your-python-package-to-pypi-65edc5fe9c56)
- [YouTube Tutorial 1](https://www.youtube.com/watch?v=Qs91v2Tofys)
- [YouTube Tutorial 2](https://www.youtube.com/watch?v=tEFkHEKypLI)

---

## 🔗 Links

- **GitHub Repository:** https://github.com/vgalpha/Topsis-Vani-102303078
- **PyPI Package:** https://pypi.org/project/Topsis-Vani-102303078/
- **Issues:** https://github.com/vgalpha/Topsis-Vani-102303078/issues
- **Jupyter Notebook:** [topsis.ipynb](./topsis.ipynb)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Vani Goyal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👩‍💻 Author

**Vani Goyal**

- **Roll Number:** 102303078
- **Institution:** Thapar Institute of Engineering & Technology
- **Email:** vgoyal_be23@thapar.edu
- **GitHub:** [@vgalpha](https://github.com/vgalpha)

---

## 🙏 Acknowledgments

- Course Instructor for assignment guidance
- TOPSIS methodology creators
- Python community for excellent libraries (pandas, numpy, matplotlib)
- Open-source contributors

---

## 📞 Support

For issues, questions, or contributions:

1. **GitHub Issues:** [Create an issue](https://github.com/vgalpha/Topsis-Vani-102303078/issues)
2. **Email:** vgoyal_be23@thapar.edu
3. **Pull Requests:** Contributions welcome!

---

## 📈 Project Status

- ✅ **Part-I:** Command-line implementation (Complete)
- ✅ **Part-II:** PyPI package (Complete)
- ⏳ **Part-III:** Web service (Planned)

---

**Last Updated:** January 2025

**Version:** 1.0.0
