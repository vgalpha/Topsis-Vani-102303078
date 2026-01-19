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
    backgroundColor: '#f8fafc',
    color: '#1f2937',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid' as const,
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
  },
  mainContent: {
    minWidth: 0,
  },
  sidebar: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.5rem',
    height: 'fit-content',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    position: 'sticky' as const,
    top: '2rem',
  },
  sidebarTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sidebarSection: {
    marginBottom: '1.5rem',
  },
  sidebarSubtitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem',
  },
  sidebarText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    marginBottom: '0.5rem',
  },
  sidebarLink: {
    color: '#3b82f6',
    textDecoration: 'underline',
  },
  howToList: {
    paddingLeft: '1rem',
    marginBottom: '1rem',
  },
  howToItem: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  titleText: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.75rem',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    color: '#1f2937',
    fontSize: '16px',
    lineHeight: '1.5',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    outline: 'none',
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  fileInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    color: '#1f2937',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease-in-out',
  },
  helpText: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '6px',
    lineHeight: '1.4',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  checkboxInput: {
    width: '18px',
    height: '18px',
    marginRight: '12px',
    accentColor: '#3b82f6',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    padding: '14px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    lineHeight: '1.5',
  },
  buttonHover: {
    backgroundColor: '#2563eb',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  error: {
    marginTop: '1rem',
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#dc2626',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  sampleSection: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },
  sampleTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#374151',
  },
  sampleCode: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    color: '#374151',
    marginBottom: '16px',
    lineHeight: '1.6',
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#6b7280',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
  },
  downloadButtonHover: {
    backgroundColor: '#4b5563',
    transform: 'translateY(-1px)',
  },
  resultsContainer: {
    marginTop: '3rem',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  resultsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  },
  resultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  tableContainer: {
    overflowX: 'auto' as const,
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    fontSize: '14px',
    borderCollapse: 'collapse' as const,
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
  },
  tableHeaderCell: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.15s ease-in-out',
  },
  tableRowHover: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    padding: '12px 16px',
    color: '#1f2937',
    fontSize: '14px',
    verticalAlign: 'middle' as const,
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

  const calculateTopsis = async () => {
    if (!validateInputs()) return

    setLoading(true)
    setError('')

    try {
      // Convert data to CSV format for Python backend
      const csvContent = Papa.unparse(data)

      // Call Python backend (local development server)
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/api/topsis'
        : '/api/topsis'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csvData: csvContent,
          weights: weights,
          impacts: impacts,
          email: email,
          sendEmail: sendEmail
        })
      })

      if (!response.ok) {
        if (response.status === 0 || !response.status) {
          throw new Error('Backend server is not running. Please start the Python server on port 8000.')
        }
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to calculate TOPSIS')
      }

      setResults(result.results)

      // Show email status message if email was requested
      if (sendEmail && email && result.message) {
        if (result.message.includes('✅')) {
          alert(result.message)
        } else if (result.message.includes('⚠️')) {
          setError(result.message)
        }
      }

    } catch (err) {
      const error = err as Error
      if (error.message.includes('fetch')) {
        setError('Cannot connect to backend server. Please ensure the Python server is running on port 8000.')
      } else {
        setError('Error calculating TOPSIS: ' + error.message)
      }
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
      {/* Header */}
      <div style={styles.title}>
        <h1 style={styles.titleText}>TOPSIS Web Service</h1>
        <p style={styles.subtitle}>Multi-Criteria Decision Analysis Tool</p>
      </div>

      <div style={styles.maxWidth}>
        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Main Form Container */}
          <div style={styles.formContainer}>
          
          {/* File Upload */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Upload CSV File *
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
              Weights *
            </label>
            <input
              type="text"
              value={weights}
              onChange={(e) => setWeights(e.target.value)}
              placeholder="e.g., 1,1,1,2"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
            <p style={styles.helpText}>
              Comma-separated numeric values (importance of each criterion)
            </p>
          </div>

          {/* Impacts */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Impacts *
            </label>
            <input
              type="text"
              value={impacts}
              onChange={(e) => setImpacts(e.target.value)}
              placeholder="e.g., +,+,-,+"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
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
              id="email-checkbox"
            />
            <label htmlFor="email-checkbox" style={styles.checkboxLabel}>
              Send results to email (optional)
            </label>
          </div>
          
          {sendEmail && (
            <div style={styles.inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>
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
            <h3 style={styles.sampleTitle}>
              Example CSV Format:
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
              onMouseOver={(e) => {
                Object.assign(e.currentTarget.style, styles.downloadButtonHover)
              }}
              onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, styles.downloadButton)
              }}
            >
              <span style={{marginRight: '8px'}}>⬇️</span>
              Download Sample CSV
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>TOPSIS Results</h2>
              <button
                onClick={downloadResults}
                style={styles.downloadButton}
                onMouseOver={(e) => {
                  Object.assign(e.currentTarget.style, styles.downloadButtonHover)
                }}
                onMouseOut={(e) => {
                  Object.assign(e.currentTarget.style, styles.downloadButton)
                }}
              >
                <span style={{marginRight: '8px'}}>⬇️</span>
                Download Results as CSV
              </button>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    {Object.keys(results[0]).map((header) => (
                      <th key={header} style={styles.tableHeaderCell}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr 
                      key={i} 
                      style={styles.tableRow}
                      onMouseOver={(e) => {
                        Object.assign(e.currentTarget.style, {
                          ...styles.tableRow,
                          ...styles.tableRowHover
                        })
                      }}
                      onMouseOut={(e) => {
                        Object.assign(e.currentTarget.style, styles.tableRow)
                      }}
                    >
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

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>
            ℹ️ About
          </h2>
          
          <div style={{
            ...styles.sidebarSection,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            margin: '-0.5rem -0.5rem 1.5rem -0.5rem',
            textAlign: 'center' as const,
            boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
          }}>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
              🎓 Developer Information
            </div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '1rem',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#fff',
              }}>
                👨‍💻 Vani Goyal
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: 'rgba(255,255,255,0.9)',
              }}>
                🆔 Roll No: 102303078
              </div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.9)',
              }}>
                📧 <a 
                  href="mailto:vgoyal_be23@thapar.edu" 
                  style={{
                    color: '#fff',
                    textDecoration: 'underline',
                    fontWeight: '600',
                  }}
                >
                  vgoyal_be23@thapar.edu
                </a>
              </div>
            </div>
            <div style={{
              fontSize: '0.875rem',
              marginTop: '0.75rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
            }}>
              Thapar Institute of Engineering & Technology
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <p style={styles.sidebarText}>
              <strong>TOPSIS</strong> (Technique for Order Preference by Similarity to Ideal Solution)
            </p>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarSubtitle}>How to use:</h3>
            <ol style={styles.howToList}>
              <li style={styles.howToItem}>Upload CSV/Excel file</li>
              <li style={styles.howToItem}>Enter weights (comma-separated)</li>
              <li style={styles.howToItem}>Enter impacts (+/- for each criterion)</li>
              <li style={styles.howToItem}>Optionally provide your email</li>
              <li style={styles.howToItem}>Click Calculate & Send</li>
            </ol>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarSubtitle}>📝 Input Format</h3>
            <p style={styles.sidebarText}>
              <strong>File Structure:</strong><br/>
              • Column 1: Alternative names<br/>
              • Column 2-N: Numeric criteria values
            </p>
            <div style={{...styles.sidebarText, fontFamily: 'monospace', backgroundColor: '#f3f4f6', padding: '0.5rem', borderRadius: '4px', fontSize: '12px', marginTop: '0.5rem'}}>
              <div>Fund,P1,P2,P3,P4</div>
              <div>M1,0.84,0.71,6.7,42.1</div>
              <div>M2,0.91,0.83,7.0,31.7</div>
            </div>
            <div style={{...styles.sidebarText, marginTop: '0.5rem'}}>
              <strong>Weights:</strong> 1,1,1,2<br/>
              <strong>Impacts:</strong> +,+,-,+
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}