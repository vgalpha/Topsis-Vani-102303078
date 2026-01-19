#!/usr/bin/env python3
"""
Local development server for TOPSIS calculations
Run this to test the Python backend locally before deploying to Vercel
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import pandas as pd
import numpy as np
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import io
import os
from datetime import datetime
import urllib.parse
from topsis import parse_weights_impacts

class TopsisHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/topsis':
            self.handle_topsis_request()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_topsis_request(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extract parameters
            csv_data = data.get('csvData')
            weights_str = data.get('weights')
            impacts_str = data.get('impacts')
            email = data.get('email')
            send_email_flag = data.get('sendEmail', False)
            
            if not all([csv_data, weights_str, impacts_str]):
                self.send_error_response("Missing required parameters")
                return
            
            # Process CSV data
            df = pd.read_csv(io.StringIO(csv_data))
            
            # Validate minimum columns
            if df.shape[1] < 3:
                self.send_error_response("File must contain at least 3 columns")
                return
            
            # Check numeric columns
            n_criteria = df.shape[1] - 1
            try:
                numeric_cols = df.iloc[:, 1:].apply(pd.to_numeric, errors='coerce')
                if numeric_cols.isnull().any().any():
                    self.send_error_response("Columns 2 onwards must contain only numeric values")
                    return
            except:
                self.send_error_response("Error checking numeric values in data")
                return
            
            # Parse inputs
            weights, impacts, parse_errors = self.parse_inputs(weights_str, impacts_str, n_criteria)
            
            if parse_errors:
                self.send_error_response("; ".join(parse_errors))
                return
            
            # Perform TOPSIS
            result_df = self.topsis(df, weights, impacts)
            
            # Handle email if requested
            email_message = "Results calculated successfully!"
            if send_email_flag and email:
                if not self.validate_email(email):
                    self.send_error_response("Invalid email format")
                    return
                
                try:
                    email_message = self.send_email(email, result_df)
                except Exception as e:
                    email_message = f"Results calculated but email failed: {str(e)}"
            
            # Convert result to JSON
            result_json = result_df.to_dict('records')
            
            response = {
                'success': True,
                'results': result_json,
                'message': email_message
            }
            
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            self.send_error_response(f"Server error: {str(e)}")
    
    def send_error_response(self, message):
        response = {
            'success': False,
            'error': message
        }
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def validate_email(self, email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    def parse_inputs(self, weights_str, impacts_str, n_cols):
        """Parse and validate weights and impacts using the PyPI package"""
        try:
            weights, impacts = parse_weights_impacts(weights_str, impacts_str, n_cols)
            return weights, impacts, []
        except SystemExit:
            return None, None, ["Invalid weights or impacts format"]
        except Exception as e:
            return None, None, [str(e)]

    def topsis(self, df, weights, impacts):
        """Perform TOPSIS analysis using PyPI package logic adapted for DataFrames"""
        # Criteria matrix = from 2nd column to last
        data = df.iloc[:, 1:].copy()
        
        # Numeric check
        for col in data.columns:
            data[col] = pd.to_numeric(data[col], errors="coerce")
        
        if data.isnull().any().any():
            raise ValueError("From 2nd to last columns must contain numeric values only.")
        
        # Step 1: Normalize
        denom = np.sqrt((data ** 2).sum(axis=0))
        if (denom == 0).any():
            raise ValueError("Normalization error: one or more criteria columns have all zeros.")
        
        norm_data = data / denom
        
        # Step 2: Weighted normalized matrix
        weighted = norm_data * weights
        
        # Step 3: Ideal best and ideal worst
        ideal_best = []
        ideal_worst = []
        
        for j in range(len(impacts)):
            col_vals = weighted.iloc[:, j].values
            if impacts[j] == "+":
                ideal_best.append(col_vals.max())
                ideal_worst.append(col_vals.min())
            else:
                ideal_best.append(col_vals.min())
                ideal_worst.append(col_vals.max())
        
        ideal_best = np.array(ideal_best)
        ideal_worst = np.array(ideal_worst)
        
        # Step 4: Distances
        dist_best = np.sqrt(((weighted - ideal_best) ** 2).sum(axis=1))
        dist_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))
        
        # Step 5: TOPSIS score
        score = dist_worst / (dist_best + dist_worst)
        
        # Ranking (higher score -> better rank 1)
        rank = score.rank(ascending=False, method="dense").astype(int)
        
        # Output
        result = df.copy()
        result["Topsis Score"] = np.round(score * 100, 2)
        result["Rank"] = rank
        
        return result

    def send_email(self, recipient_email, result_df):
        """Send email with results - copied from Streamlit version"""
        try:
            # Convert dataframe to CSV
            csv_buffer = io.StringIO()
            result_df.to_csv(csv_buffer, index=False)
            csv_content = csv_buffer.getvalue()
            
            # Email configuration (using environment variables for security)
            sender_email = os.getenv('SMTP_EMAIL', 'topsis.service@gmail.com')
            sender_password = os.getenv('SMTP_PASSWORD', '')
            
            # If no SMTP config provided, return CSV content for download
            if not sender_password:
                return "No email configuration. Download results below."
            
            # Create message
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = recipient_email
            msg['Subject'] = f'TOPSIS Analysis Results - {datetime.now().strftime("%Y-%m-%d %H:%M")}'
            
            # Email body
            body = f"""
Hello,

Your TOPSIS analysis has been completed successfully!

Please find the results attached as a CSV file.

Summary:
- Total Alternatives: {len(result_df)}
- Best Alternative: {result_df.loc[result_df['Rank'] == 1, result_df.columns[0]].values[0]}
- Best Score: {result_df.loc[result_df['Rank'] == 1, 'Topsis Score'].values[0]:.2f}

Thank you for using TOPSIS Web Service.

---
TOPSIS Web Service
Developed by: Vani Goyal (102303078)
Thapar Institute of Engineering & Technology
"""
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Attach CSV file
            attachment = MIMEBase('application', 'octet-stream')
            attachment.set_payload(csv_content.encode())
            encoders.encode_base64(attachment)
            attachment.add_header('Content-Disposition', f'attachment; filename=topsis_results_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv')
            msg.attach(attachment)
            
            # Send email
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(msg)
            
            return f"✅ Results sent successfully to {recipient_email}!"
            
        except Exception as e:
            return f"⚠️ Could not send email: {str(e)}. Download results below."

if __name__ == '__main__':
    print("🐍 Starting local Python TOPSIS server...")
    print("📍 Server will run on: http://localhost:8000")
    print("🔗 Frontend should connect to: http://localhost:8000/api/topsis")
    print("💡 Make sure your frontend is running on port 3000")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    server = HTTPServer(('localhost', 8000), TopsisHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        server.server_close()