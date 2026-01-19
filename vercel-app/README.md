# TOPSIS Web Service

A Next.js web application for performing TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) multi-criteria decision analysis.

## Features

✅ **File Upload**: Support for CSV file uploads  
✅ **Sample CSV Download**: Download example data format  
✅ **Optional Email**: Checkbox to make email sending optional  
✅ **Real-time Calculation**: Instant TOPSIS analysis  
✅ **Results Download**: Download results as CSV  
✅ **Responsive Design**: Dark theme UI that matches your existing design  

## Screenshots

The app matches the design shown in your screenshots with:
- Dark theme interface
- Optional email checkbox
- Sample CSV download functionality
- Results table with ranking
- Clean, modern UI

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Usage

1. Upload a CSV file with the first column as option names and remaining columns as numeric criteria
2. Enter weights (comma-separated, e.g., `1,1,1,2`)
3. Enter impacts (comma-separated + or -, e.g., `+,+,-,+`)
4. Optionally check the email box and enter your email
5. Click "Calculate TOPSIS" to get results
6. Download results as CSV

## CSV Format

```csv
Model,Price,Storage,Camera,Battery
P1,250,64,12,4000
P2,200,32,8,3500
P3,300,128,16,4500
```

**Weights:** `1,1,1,2` (importance of each criterion)  
**Impacts:** `+,+,-,+` (+ = higher is better, - = lower is better)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Inline styles (no external CSS framework dependency)
- **CSV Processing:** Papa Parse
- **File Downloads:** FileSaver.js
- **Deployment:** Vercel

## Project Structure

```
vercel-app/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

## Algorithm

The TOPSIS algorithm implemented includes:

1. **Normalization:** Vector normalization of the decision matrix
2. **Weighting:** Apply user-defined weights to criteria
3. **Ideal Solutions:** Calculate ideal best and worst solutions
4. **Distance Calculation:** Euclidean distances to ideal solutions
5. **TOPSIS Score:** Relative closeness to ideal solution
6. **Ranking:** Sort alternatives by TOPSIS score

## Author

**Vani Goyal**  
Roll No: 102303078  
Thapar Institute of Engineering & Technology

## License

MIT License