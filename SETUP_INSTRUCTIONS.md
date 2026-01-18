# Complete Setup Instructions for TOPSIS Assignment

## 📦 What You Have

I've created ALL files you need:

### Repository Files (for GitHub)
```
✓ README_GITHUB.md      → Rename to README.md for your repository
✓ topsis.py             → Command-line implementation
✓ topsis.ipynb          → Jupyter/Colab notebook with visualizations
✓ data.xlsx             → Test data (Excel)
✓ data.csv              → Test data (CSV)
✓ result.csv            → Example output
✓ requirements.txt      → Python dependencies
```

### PyPI Package (ready to upload)
```
✓ Topsis-Vani-102303078/
  ├── topsis_vani_102303078/
  │   ├── __init__.py
  │   └── topsis.py
  ├── setup.py
  ├── README.md
  ├── LICENSE
  ├── MANIFEST.in
  └── .gitignore
```

---

## 🎯 Setup Process (3 Main Steps)

### STEP 1: Switch Git User (5 minutes)

Before creating your repository, switch to your vgalpha account:

```bash
# Quick method (for current directory only)
cd path/to/where/you/want/to/work
git config user.name "Vani Goyal"
git config user.email "vgoyal_be23@thapar.edu"

# Verify
git config user.name
git config user.email
```

**OR create a reusable function:**

```bash
# Add to ~/.zshrc or ~/.bashrc
cat >> ~/.zshrc << 'EOF'

# Git user switcher
gitsw() {
    if [ "$1" = "vgalpha" ]; then
        git config user.name "Vani Goyal"
        git config user.email "vgoyal_be23@thapar.edu"
        echo "✓ Switched to vgalpha (Vani Goyal)"
    else
        echo "Current: $(git config user.name) <$(git config user.email)>"
    fi
}
EOF

# Reload
source ~/.zshrc

# Use it
gitsw vgalpha
```

---

### STEP 2: Create GitHub Repository (15 minutes)

#### 2.1 Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `Topsis-Vani-102303078`
3. **Description:** `TOPSIS implementation for multi-criteria decision making`
4. **Public** ✓
5. **✓ Add README file**
6. **Add .gitignore:** Python
7. **License:** MIT License
8. Click **"Create repository"**

**Result:** https://github.com/vgalpha/Topsis-Vani-102303078

#### 2.2 Clone and Setup Locally

```bash
# Clone your new repository
git clone https://github.com/vgalpha/Topsis-Vani-102303078
cd Topsis-Vani-102303078

# Verify git user
git config user.name    # Should show: Vani Goyal
git config user.email   # Should show: vgoyal_be23@thapar.edu
```

#### 2.3 Copy Files to Repository

**From the topsis-complete-package folder I created:**

```bash
# Assuming you're in Topsis-Vani-102303078/ directory

# Copy all main files
cp /path/to/topsis-complete-package/topsis.py .
cp /path/to/topsis-complete-package/topsis.ipynb .
cp /path/to/topsis-complete-package/data.xlsx .
cp /path/to/topsis-complete-package/data.csv .
cp /path/to/topsis-complete-package/result.csv .
cp /path/to/topsis-complete-package/requirements.txt .

# Replace README with the comprehensive one
rm README.md
cp /path/to/topsis-complete-package/README.md README.md

# Copy package directory (for reference)
cp -r /path/to/topsis-complete-package/Topsis-Vani-102303078 ./package/
```

**OR if you have the topsis-complete-package folder directly:**

```bash
# Navigate to where topsis-complete-package is
cd /path/to/topsis-complete-package

# Copy everything to your repo
cp topsis.py data.xlsx data.csv result.csv requirements.txt topsis.ipynb ../Topsis-Vani-102303078/
cp README.md ../Topsis-Vani-102303078/README.md
mkdir -p ../Topsis-Vani-102303078/package
cp -r Topsis-Vani-102303078 ../Topsis-Vani-102303078/package/

# Go to your repo
cd ../Topsis-Vani-102303078
```

#### 2.4 Verify Files

```bash
# Check what you have
ls -la

# Should see:
# topsis.py
# topsis.ipynb
# data.xlsx
# data.csv
# result.csv
# requirements.txt
# README.md (the comprehensive one)
# LICENSE (created by GitHub)
# .gitignore (created by GitHub)
# package/ (PyPI package directory)
```

#### 2.5 Push to GitHub

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Add complete TOPSIS implementation

- Add topsis.py (CLI implementation)
- Add topsis.ipynb (Jupyter notebook with visualizations)
- Add test data and example results
- Add comprehensive README with methodology
- Add PyPI package structure
- Add requirements.txt"

# Push
git push origin main
```

#### 2.6 Verify on GitHub

Visit: https://github.com/vgalpha/Topsis-Vani-102303078

Should see all files properly displayed with README showing markdown formatting.

---

### STEP 3: Upload to PyPI (30 minutes)

#### 3.1 Prepare Package

```bash
# Navigate to package directory
cd package/Topsis-Vani-102303078

# OR if not in repo, use the standalone package
cd /path/to/topsis-complete-package/Topsis-Vani-102303078
```

#### 3.2 Install Build Tools

```bash
pip install setuptools wheel twine
```

#### 3.3 Build Package

```bash
# Build distribution packages
python setup.py sdist bdist_wheel

# This creates:
# - dist/Topsis-Vani-102303078-1.0.0.tar.gz
# - dist/Topsis_Vani_102303078-1.0.0-py3-none-any.whl
```

#### 3.4 Test Package Locally (Optional but Recommended)

```bash
# Install in editable mode
pip install -e .

# Test CLI
topsis ../data.csv "1,1,1,1,1" "+,+,-,+,+" test.csv

# Test Python import
python -c "from topsis_vani_102303078 import topsis; print('Success!')"

# Uninstall after testing
pip uninstall Topsis-Vani-102303078
```

#### 3.5 Create PyPI Account

1. Go to https://pypi.org/account/register/
2. Create account with your email: vgoyal_be23@thapar.edu
3. Verify email
4. (Optional) Go to https://test.pypi.org/ and create test account

#### 3.6 Upload to PyPI

**Option A: Upload to Test PyPI first (Recommended)**

```bash
# Upload to Test PyPI
twine upload --repository testpypi dist/*

# When prompted:
# Username: your_testpypi_username
# Password: your_testpypi_password

# Test installation
pip install --index-url https://test.pypi.org/simple/ Topsis-Vani-102303078

# Test it works
topsis data.csv "1,1,1,1,1" "+,+,-,+,+" test.csv
```

**Option B: Upload to Production PyPI**

```bash
# Upload to PyPI
twine upload dist/*

# When prompted:
# Username: your_pypi_username
# Password: your_pypi_password
```

#### 3.7 Verify on PyPI

Visit: https://pypi.org/project/Topsis-Vani-102303078/

Should see your package with README displayed.

#### 3.8 Test Installation

```bash
# In a new terminal/environment
pip install Topsis-Vani-102303078

# Test CLI
topsis data.csv "1,1,1,1,1" "+,+,-,+,+" output.csv

# Success!
```

---

## 📋 Quick Command Reference

### GitHub Setup
```bash
# 1. Create repo on GitHub.com
# 2. Clone
git clone https://github.com/vgalpha/Topsis-Vani-102303078
cd Topsis-Vani-102303078

# 3. Copy files (see STEP 2.3 above)

# 4. Push
git add .
git commit -m "Add complete TOPSIS implementation"
git push origin main
```

### PyPI Upload
```bash
cd package/Topsis-Vani-102303078
pip install setuptools wheel twine
python setup.py sdist bdist_wheel
twine upload dist/*
```

---

## ✅ Verification Checklist

### GitHub Repository
- [ ] Repository created: Topsis-Vani-102303078
- [ ] Repository is public
- [ ] All files visible on GitHub
- [ ] README displays properly with formatting
- [ ] topsis.ipynb opens in GitHub viewer
- [ ] Can clone repository successfully
- [ ] Can run: `python topsis.py data.csv "1,1,1,1,1" "+,+,-,+,+" test.csv`

### PyPI Package
- [ ] PyPI account created
- [ ] Package built successfully
- [ ] Package uploaded to PyPI
- [ ] Package visible at: pypi.org/project/Topsis-Vani-102303078/
- [ ] Can install: `pip install Topsis-Vani-102303078`
- [ ] Command works: `topsis data.csv "1,1,1,1,1" "+,+,-,+,+" test.csv`
- [ ] Python import works: `from topsis_vani_102303078 import topsis`

### Jupyter Notebook
- [ ] Opens in Google Colab
- [ ] Runs without errors
- [ ] Generates visualizations
- [ ] Produces correct results

---

## 🐛 Troubleshooting

### Issue: Git shows wrong user

```bash
# Check current user
git config user.name
git config user.email

# Fix it
git config user.name "Vani Goyal"
git config user.email "vgoyal_be23@thapar.edu"

# Amend last commit if needed
git commit --amend --author="Vani Goyal <vgoyal_be23@thapar.edu>" --no-edit
git push --force
```

### Issue: Package name already exists on PyPI

```bash
# Change package name in setup.py
name='Topsis-Vani-102303078-v2',

# Rebuild
rm -rf dist/ build/ *.egg-info
python setup.py sdist bdist_wheel
twine upload dist/*
```

### Issue: Import errors after installation

```bash
# Reinstall
pip uninstall Topsis-Vani-102303078
pip install Topsis-Vani-102303078

# Verify installation
pip show Topsis-Vani-102303078
```

### Issue: Jupyter notebook won't run

```bash
# Install dependencies
pip install jupyter pandas numpy matplotlib seaborn openpyxl

# Start Jupyter
jupyter notebook topsis.ipynb
```

---

## 📞 Need Help?

If you encounter any issues:

1. Check the error message carefully
2. Verify you followed all steps
3. Check file locations (files in correct directories)
4. Verify Git user is set correctly
5. Make sure you're connected to internet for PyPI upload

**Common mistakes:**
- Forgot to switch Git user
- Files in wrong directory
- Package name typo
- Forgot to activate virtual environment
- Using wrong Python version

---

## 🎯 Final Submission

For your assignment submission, provide:

1. **GitHub Repository URL:**
   ```
   https://github.com/vgalpha/Topsis-Vani-102303078
   ```

2. **PyPI Package URL:**
   ```
   https://pypi.org/project/Topsis-Vani-102303078/
   ```

3. **Files to verify:**
   - README with methodology and results ✓
   - Jupyter notebook with visualizations ✓
   - Working CLI implementation ✓
   - PyPI package installable ✓

---

## 📊 Expected Timeline

- **Git user setup:** 5 minutes
- **GitHub repository:** 15 minutes
- **PyPI package:** 30 minutes
- **Testing & verification:** 10 minutes
- **Total:** ~1 hour

---

## ✨ You're All Set!

Everything is ready. Just follow the steps above and you'll have:
- ✅ Complete GitHub repository
- ✅ Published PyPI package
- ✅ Jupyter notebook with visualizations
- ✅ Comprehensive documentation

Good luck with your submission! 🚀
