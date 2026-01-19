'use client'

import React, { useState } from 'react'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

interface TopsisResult {
  [key: string]: any
  'Topsis Score': number
  'Rank': number
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: '#f9fafb',
    padding: '2rem',
  },
  maxWidth: {
    maxWidth: '64rem',
    margin: '0 auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  titleText: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#9ca3af',
  },
  formContainer: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    maxWidth: '32rem',
    margin: '0 auto',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '0.25rem',
    color: 'white',
  },
  fileInput: {
    width: '100%',
    fontSize: '0.875rem',
    color: '#9ca3af',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '0.25rem',
    padding: '0.5rem',
  },
  helpText: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginTop: '0.25rem',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  checkboxInput: {
    width: '1rem',
    height: '1rem',
    marginRight: '0.75rem',
    accentColor: '#3b82f6',
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    color: 'white',
    fontWeight: '500',
    padding: '0.75rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#1f2937',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '0.25rem',
    color: '#fca5a5',
    fontSize: '0.875rem',
  },
  sampleSection: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #4b5563',
  },
  sampleCode: {
    backgroundColor: '#111827',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    color: '#d1d5db',
    marginBottom: '0.75rem',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#374151',
    color: 'white',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  downloadButtonHover: {
    backgroundColor: '#4b5563',
  },
  resultsContainer: {
    marginTop: '2rem',
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '0.5rem',
    padding: '1.5rem',
  },
  resultsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  resultsTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    fontSize: '0.875rem',
  },
  tableHeader: {
    borderBottom: '1px solid #4b5563',
  },
  tableHeaderCell: {
    textAlign: 'left' as const,
    padding: '0.5rem',
    fontWeight: '500',
  },
  tableRow: {
    borderBottom: '1px solid #374151',
  },
  tableCell: {
    padding: '0.5rem',
  },
}

export default function TopsisApp() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [weights, setWeights] = useState('')
  const [impacts, setImpacts] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<TopsisResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sampleData = [
    ['Model', 'Price', 'Storage', 'Camera', 'Battery'],
    ['P1', '250', '64', '12', '4000'],
    ['P2', '200', '32', '8', '3500'],
    ['P3', '300', '128', '16', '4500'],
    ['P4', '275', '64', '12', '4200'],
    ['P5', '225', '32', '16', '3800'],
    ['P6', '350', '256', '20', '5000'],
    ['P7', '180', '32', '8', '3200'],
    ['P8', '320', '128', '16', '4800']
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)

    Papa.parse(uploadedFile, {
      complete: (results) => {
        setData(results.data as any[])
        setError('')
      },
      error: () => {
        setError('Error parsing CSV file')
      },
      header: false
    })
  }

  const downloadSampleCSV = () => {
    const csv = Papa.unparse(sampleData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'sample_data.csv')
  }

  const validateInputs = (): boolean => {
    if (!data.length || data.length < 2) {
      setError('Please upload a valid CSV file')
      return false
    }

    const numCriteria = data[0].length - 1
    
    if (numCriteria < 2) {
      setError('CSV must have at least 3 columns (1 for names + 2 criteria)')
      return false
    }

    if (!weights.trim()) {
      setError('Please enter weights')
      return false
    }

    if (!impacts.trim()) {
      setError('Please enter impacts')
      return false
    }

    const weightArray = weights.split(',').map(w => parseFloat(w.trim()))
    const impactArray = impacts.split(',').map(i => i.trim())

    if (weightArray.length !== numCriteria) {
      setError(`Number of weights (${weightArray.length}) must equal number of criteria (${numCriteria})`)
      return false
    }

    if (impactArray.length !== numCriteria) {
      setError(`Number of impacts (${impactArray.length}) must equal number of criteria (${numCriteria})`)
      return false
    }

    if (weightArray.some(w => isNaN(w) || w <= 0)) {
      setError('All weights must be positive numbers')
      return false
    }

    if (impactArray.some(i => i !== '+' && i !== '-')) {
      setError('Impacts must be either "+" or "-"')
      return false
    }

    if (sendEmail && (!email.trim() || !email.includes('@'))) {
      setError('Please enter a valid email address')
      return false
    }

    return true
  }

  const calculateTopsis = () => {
    if (!validateInputs()) return

    setLoading(true)
    setError('')

    try {
      const weightArray = weights.split(',').map(w => parseFloat(w.trim()))
      const impactArray = impacts.split(',').map(i => i.trim())

      // Extract numeric data
      const dataMatrix = data.slice(1).map(row => 
        row.slice(1).map((val: string) => parseFloat(val))
      )

      // Normalize the matrix
      const normalizedMatrix = dataMatrix.map((row: number[], i: number) => 
        row.map((val: number, j: number) => {
          const sumSquares = dataMatrix.reduce((sum: number, r: number[]) => sum + (r[j] ** 2), 0)
          return val / Math.sqrt(sumSquares)
        })
      )

      // Apply weights
      const weightedMatrix = normalizedMatrix.map((row: number[]) => 
        row.map((val: number, j: number) => val * weightArray[j])
      )

      // Find ideal best and worst
      const idealBest: number[] = []
      const idealWorst: number[] = []

      for (let j = 0; j < weightArray.length; j++) {
        const column = weightedMatrix.map((row: number[]) => row[j])
        if (impactArray[j] === '+') {
          idealBest.push(Math.max(...column))
          idealWorst.push(Math.min(...column))
        } else {
          idealBest.push(Math.min(...column))
          idealWorst.push(Math.max(...column))
        }
      }

      // Calculate distances and scores
      const scores = weightedMatrix.map((row: number[]) => {
        const distToBest = Math.sqrt(
          row.reduce((sum: number, val: number, j: number) => sum + ((val - idealBest[j]) ** 2), 0)
        )
        const distToWorst = Math.sqrt(
          row.reduce((sum: number, val: number, j: number) => sum + ((val - idealWorst[j]) ** 2), 0)
        )
        return distToWorst / (distToBest + distToWorst)
      })

      // Create results with ranking
      const resultsWithScores = data.slice(1).map((row, i) => {
        const result: any = {}
        data[0].forEach((header: string, j: number) => {
          result[header] = row[j]
        })
        result['Topsis Score'] = (scores[i] * 100).toFixed(2)
        return result
      })

      // Add ranks
      const sortedResults = [...resultsWithScores].sort((a, b) => 
        parseFloat(b['Topsis Score']) - parseFloat(a['Topsis Score'])
      )

      sortedResults.forEach((result, i) => {
        result['Rank'] = i + 1
      })

      setResults(sortedResults)

      // Handle email if requested
      if (sendEmail && email) {
        // In a real app, you'd send this to an API endpoint
        console.log('Email would be sent to:', email)
        alert('Results calculated! In a real implementation, results would be emailed.')
      }

    } catch (err) {
      setError('Error calculating TOPSIS: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const downloadResults = () => {
    if (!results.length) return

    const csv = Papa.unparse(results)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    saveAs(blob, `topsis_results_${timestamp}.csv`)
  }

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.title}>
          <h1 style={styles.titleText}>TOPSIS WEB SERVICE</h1>
          <p style={styles.subtitle}>MULTI-CRITERIA DECISION ANALYSIS TOOL</p>
        </div>

        {/* Main Form Container */}
        <div style={styles.formContainer}>
          
          {/* File Upload */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              UPLOAD CSV FILE *
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={styles.fileInput}
            />
            <p style={styles.helpText}>
              First column: option names, remaining columns: numeric criteria values
            </p>
          </div>

          {/* Weights */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              WEIGHTS *
            </label>
            <input
              type="text"
              value={weights}
              onChange={(e) => setWeights(e.target.value)}
              placeholder="e.g., 1,1,1,2"
              style={styles.input}
            />
            <p style={styles.helpText}>
              Comma-separated numeric values (importance of each criterion)
            </p>
          </div>

          {/* Impacts */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              IMPACTS *
            </label>
            <input
              type="text"
              value={impacts}
              onChange={(e) => setImpacts(e.target.value)}
              placeholder="e.g., +,+,-,+"
              style={styles.input}
            />
            <p style={styles.helpText}>
              Comma-separated + or - (+ for maximize, - for minimize)
            </p>
          </div>

          {/* Email Option */}
          <div style={styles.checkbox}>
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
              style={styles.checkboxInput}
            />
            <span style={styles.label}>SEND RESULTS TO EMAIL (OPTIONAL)</span>
          </div>
          
          {sendEmail && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              style={{...styles.input, marginBottom: '1.5rem'}}
            />
          )}

          {/* Calculate Button */}
          <button
            onClick={calculateTopsis}
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            {loading ? 'CALCULATING...' : 'CALCULATE TOPSIS'}
          </button>

          {/* Error Display */}
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {/* Sample CSV Section */}
          <div style={styles.sampleSection}>
            <h3 style={{...styles.label, fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem'}}>
              EXAMPLE CSV FORMAT:
            </h3>
            <div style={styles.sampleCode}>
              <div>Model,Price,Storage,Camera,Battery</div>
              <div>P1,250,64,12,4000</div>
              <div>P2,200,32,8,3500</div>
              <div>P3,300,128,16,4500</div>
            </div>
            
            <button
              onClick={downloadSampleCSV}
              style={styles.downloadButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
            >
              <span style={{marginRight: '0.5rem'}}>⬇️</span>
              DOWNLOAD SAMPLE CSV FILE
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>▼ TOPSIS RESULTS</h2>
              <button
                onClick={downloadResults}
                style={styles.downloadButton}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
              >
                <span style={{marginRight: '0.5rem'}}>⬇️</span>
                DOWNLOAD RESULTS AS CSV
              </button>
            </div>

            <div style={{overflowX: 'auto'}}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    {Object.keys(results[0]).map((header) => (
                      <th key={header} style={styles.tableHeaderCell}>
                        {header.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} style={styles.tableRow}>
                      {Object.values(row).map((value, j) => (
                        <td key={j} style={styles.tableCell}>
                          {value as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}