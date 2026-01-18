import streamlit as st
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

# Page configuration
st.set_page_config(
    page_title="TOPSIS Web Service",
    page_icon="📊",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .sub-header {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
    }
    .stButton>button {
        width: 100%;
        background-color: #1f77b4;
        color: white;
        font-weight: bold;
    }
    .success-box {
        padding: 1rem;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 0.25rem;
        color: #155724;
    }
    .error-box {
        padding: 1rem;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 0.25rem;
        color: #721c24;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown('<h1 class="main-header">📊 TOPSIS Web Service</h1>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Multi-Criteria Decision Making Analysis</p>', unsafe_allow_html=True)

# Sidebar with information
with st.sidebar:
    st.header("ℹ️ About")
    st.write("""
    **TOPSIS** (Technique for Order Preference by Similarity to Ideal Solution)
    
    **Author:** Vani Goyal  
    **Roll No:** 102303078  
    **Email:** vgoyal_be23@thapar.edu
    
    ---
    
    **How to use:**
    1. Upload CSV/Excel file
    2. Enter weights (comma-separated)
    3. Enter impacts (+/- for each criterion)
    4. Provide your email
    5. Click Calculate & Send
    """)
    
    st.header("📝 Input Format")
    st.write("""
    **File Structure:**
    - Column 1: Alternative names
    - Column 2-N: Numeric criteria values
    
    **Example:**
    ```
    Fund,P1,P2,P3,P4
    M1,0.84,0.71,6.7,42.1
    M2,0.91,0.83,7.0,31.7
    ```
    
    **Weights:** `1,1,1,2`  
    **Impacts:** `+,+,-,+`
    """)


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def parse_inputs(weights_str, impacts_str, n_cols):
    """Parse and validate weights and impacts"""
    errors = []
    
    # Check comma separated
    if "," not in weights_str:
        errors.append("Weights must be comma-separated (e.g., '1,1,1,2')")
    if "," not in impacts_str:
        errors.append("Impacts must be comma-separated (e.g., '+,+,-,+')")
    
    if errors:
        return None, None, errors
    
    # Parse weights
    try:
        weights = [float(x.strip()) for x in weights_str.split(",")]
    except:
        errors.append("Weights must be numeric values")
        return None, None, errors
    
    # Parse impacts
    impacts = [x.strip() for x in impacts_str.split(",")]
    
    # Validate counts
    if len(weights) != n_cols:
        errors.append(f"Number of weights ({len(weights)}) must equal number of criteria columns ({n_cols})")
    
    if len(impacts) != n_cols:
        errors.append(f"Number of impacts ({len(impacts)}) must equal number of criteria columns ({n_cols})")
    
    # Validate impacts
    for imp in impacts:
        if imp not in ["+", "-"]:
            errors.append(f"Invalid impact '{imp}'. Impacts must be '+' or '-' only")
            break
    
    # Validate weights are positive
    if weights and any(w <= 0 for w in weights):
        errors.append("All weights must be positive numbers")
    
    if errors:
        return None, None, errors
    
    return np.array(weights, dtype=float), impacts, []


def topsis(df, weights, impacts):
    """Perform TOPSIS analysis"""
    # Extract data
    names = df.iloc[:, 0].values
    data = df.iloc[:, 1:].values.astype(float)
    
    # Step 1: Normalize
    denom = np.sqrt((data ** 2).sum(axis=0))
    if (denom == 0).any():
        raise ValueError("One or more criteria columns have all zeros")
    
    normalized = data / denom
    
    # Step 2: Weighted normalized matrix
    weighted = normalized * weights
    
    # Step 3: Ideal best and worst
    ideal_best = []
    ideal_worst = []
    
    for j, impact in enumerate(impacts):
        if impact == "+":
            ideal_best.append(weighted[:, j].max())
            ideal_worst.append(weighted[:, j].min())
        else:
            ideal_best.append(weighted[:, j].min())
            ideal_worst.append(weighted[:, j].max())
    
    ideal_best = np.array(ideal_best)
    ideal_worst = np.array(ideal_worst)
    
    # Step 4: Distances
    dist_best = np.sqrt(((weighted - ideal_best) ** 2).sum(axis=1))
    dist_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))
    
    # Step 5: TOPSIS Score
    scores = dist_worst / (dist_best + dist_worst)
    
    # Step 6: Ranking
    ranks = scores.argsort()[::-1].argsort() + 1
    
    # Create result dataframe
    result = df.copy()
    result['Topsis Score'] = (scores * 100).round(2)
    result['Rank'] = ranks
    
    return result


def send_email(recipient_email, result_df, smtp_config=None):
    """Send email with results"""
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
            return csv_content, "No email configuration. Download results below."
        
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
        
        return csv_content, f"✅ Results sent successfully to {recipient_email}!"
        
    except Exception as e:
        return csv_content if 'csv_content' in locals() else None, f"⚠️ Could not send email: {str(e)}. Download results below."


# Main application
st.header("📤 Upload Your Data")

col1, col2 = st.columns([2, 1])

with col1:
    uploaded_file = st.file_uploader(
        "Choose a CSV or Excel file",
        type=['csv', 'xlsx', 'xls'],
        help="First column should be alternative names, rest should be numeric criteria"
    )

with col2:
    st.info("💡 **Tip:** Ensure your data has at least 3 columns with numeric values in columns 2 onwards.")

if uploaded_file is not None:
    try:
        # Read file
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)
        
        # Display data preview
        st.success(f"✅ File uploaded successfully! Shape: {df.shape[0]} rows × {df.shape[1]} columns")
        
        with st.expander("📊 Preview Data", expanded=True):
            st.dataframe(df, use_container_width=True)
        
        # Validate minimum columns
        if df.shape[1] < 3:
            st.error("❌ File must contain at least 3 columns (1 for names + 2 criteria)")
            st.stop()
        
        # Check numeric columns
        n_criteria = df.shape[1] - 1
        try:
            numeric_cols = df.iloc[:, 1:].apply(pd.to_numeric, errors='coerce')
            if numeric_cols.isnull().any().any():
                st.error("❌ Columns 2 onwards must contain only numeric values")
                st.stop()
        except:
            st.error("❌ Error checking numeric values in data")
            st.stop()
        
        st.markdown("---")
        
        # Input parameters
        st.header("⚙️ Configure Parameters")
        
        col1, col2 = st.columns(2)
        
        with col1:
            weights_input = st.text_input(
                "🎯 Weights",
                placeholder=f"e.g., {','.join(['1'] * n_criteria)}",
                help=f"Enter {n_criteria} comma-separated positive numbers"
            )
        
        with col2:
            impacts_input = st.text_input(
                "📈 Impacts",
                placeholder=f"e.g., {','.join(['+'] * n_criteria)}",
                help=f"Enter {n_criteria} comma-separated '+' or '-' signs. '+' means higher is better, '-' means lower is better"
            )
        
        email_input = st.text_input(
            "📧 Email Address",
            placeholder="your.email@example.com",
            help="Enter your email to receive results"
        )
        
        st.markdown("---")
        
        # Calculate button
        if st.button("🚀 Calculate TOPSIS & Send Results", use_container_width=True):
            errors = []
            
            # Validate inputs
            if not weights_input:
                errors.append("Please enter weights")
            if not impacts_input:
                errors.append("Please enter impacts")
            if not email_input:
                errors.append("Please enter email address")
            elif not validate_email(email_input):
                errors.append("Please enter a valid email address")
            
            if errors:
                for error in errors:
                    st.error(f"❌ {error}")
            else:
                # Parse inputs
                weights, impacts, parse_errors = parse_inputs(weights_input, impacts_input, n_criteria)
                
                if parse_errors:
                    for error in parse_errors:
                        st.error(f"❌ {error}")
                else:
                    try:
                        # Show progress
                        with st.spinner("🔄 Running TOPSIS analysis..."):
                            # Perform TOPSIS
                            result_df = topsis(df, weights, impacts)
                        
                        st.success("✅ TOPSIS analysis completed successfully!")
                        
                        # Display results
                        st.header("📊 Results")
                        
                        # Summary metrics
                        col1, col2, col3 = st.columns(3)
                        
                        with col1:
                            st.metric("Total Alternatives", len(result_df))
                        
                        with col2:
                            best_alt = result_df.loc[result_df['Rank'] == 1, df.columns[0]].values[0]
                            st.metric("Best Alternative", best_alt)
                        
                        with col3:
                            best_score = result_df.loc[result_df['Rank'] == 1, 'Topsis Score'].values[0]
                            st.metric("Best Score", f"{best_score:.2f}")
                        
                        # Results table
                        with st.expander("📋 Detailed Results", expanded=True):
                            st.dataframe(
                                result_df.sort_values('Rank'),
                                use_container_width=True,
                                hide_index=True
                            )
                        
                        # Send email
                        with st.spinner("📧 Sending email..."):
                            csv_content, message = send_email(email_input, result_df)
                        
                        if "successfully" in message.lower():
                            st.success(message)
                        else:
                            st.warning(message)
                        
                        # Download button
                        if csv_content:
                            st.download_button(
                                label="⬇️ Download Results (CSV)",
                                data=csv_content,
                                file_name=f"topsis_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                                mime="text/csv",
                                use_container_width=True
                            )
                        
                    except Exception as e:
                        st.error(f"❌ Error during TOPSIS calculation: {str(e)}")
    
    except Exception as e:
        st.error(f"❌ Error reading file: {str(e)}")
        st.info("Please ensure your file is a valid CSV or Excel file with proper formatting")

else:
    # Show example when no file uploaded
    st.info("👆 Please upload a CSV or Excel file to begin")
    
    with st.expander("📖 See Example Data Format"):
        example_data = {
            'Fund Name': ['M1', 'M2', 'M3', 'M4', 'M5'],
            'P1': [0.84, 0.91, 0.79, 0.78, 0.94],
            'P2': [0.71, 0.83, 0.62, 0.61, 0.88],
            'P3': [6.7, 7.0, 4.8, 6.4, 3.6],
            'P4': [42.1, 31.7, 46.7, 42.4, 62.2]
        }
        st.dataframe(pd.DataFrame(example_data), use_container_width=True)
        
        st.write("**For this data:**")
        st.write("- Weights: `1,1,1,1`")
        st.write("- Impacts: `+,+,-,+` (P1, P2, P4 higher is better; P3 lower is better)")

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666;'>
    <p>
        <strong>TOPSIS Web Service</strong><br>
        Developed by <strong>Vani Goyal</strong> (Roll No: 102303078)<br>
        Thapar Institute of Engineering & Technology<br>
        <a href='https://github.com/vgalpha/Topsis-Vani-102303078'>GitHub</a> | 
        <a href='https://pypi.org/project/Topsis-Vani-102303078/'>PyPI Package</a>
    </p>
</div>
""", unsafe_allow_html=True)
