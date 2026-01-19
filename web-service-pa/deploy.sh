#!/bin/bash

# PythonAnywhere Deployment Script for TOPSIS Streamlit App
# Author: Vani Goyal (102303078)

echo "🚀 TOPSIS Streamlit App - PythonAnywhere Deployment"
echo "=================================================="

# Check if username is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your PythonAnywhere username"
    echo "Usage: ./deploy.sh YOUR_USERNAME"
    echo "Example: ./deploy.sh johndoe"
    exit 1
fi

USERNAME=$1
DOMAIN="${USERNAME}.pythonanywhere.com"
VENV_NAME="topsis_env"
APP_DIR="topsis"

echo "👤 Username: $USERNAME"
echo "🌐 Domain: $DOMAIN"
echo "📁 App Directory: ~/$APP_DIR"
echo "🐍 Virtual Environment: $VENV_NAME"
echo ""

# Check if pythonanywhere CLI is installed
if ! command -v pa &> /dev/null; then
    echo "📦 Installing PythonAnywhere CLI tools..."
    pip install --upgrade pythonanywhere
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install PythonAnywhere CLI tools"
        exit 1
    fi
else
    echo "✅ PythonAnywhere CLI tools already installed"
fi

echo ""
echo "📋 Deployment Steps:"
echo "1. Create virtual environment: $VENV_NAME"
echo "2. Install dependencies from requirements.txt"
echo "3. Deploy Streamlit app to: $DOMAIN"
echo ""

# Create deployment command
STREAMLIT_CMD="/home/$USERNAME/.virtualenvs/$VENV_NAME/bin/streamlit run /home/$USERNAME/$APP_DIR/streamlit_app.py --server.address \"unix://\${DOMAIN_SOCKET}\" --server.enableCORS false --server.enableXsrfProtection false --server.enableWebsocketCompression false"

echo "🔧 Deployment command:"
echo "$STREAMLIT_CMD"
echo ""

echo "📝 Manual Steps Required:"
echo ""
echo "1. Upload files to PythonAnywhere:"
echo "   - Upload streamlit_app.py to ~/$APP_DIR/"
echo "   - Upload requirements.txt to ~/$APP_DIR/"
echo ""
echo "2. SSH into PythonAnywhere console and run:"
echo "   mkvirtualenv $VENV_NAME --python=python3.13"
echo "   cd ~/$APP_DIR"
echo "   pip install -r requirements.txt"
echo ""
echo "3. Set up environment variables (SMTP credentials):"
echo "   echo 'export SMTP_EMAIL=\"your_email@gmail.com\"' >> ~/.bashrc"
echo "   echo 'export SMTP_PASSWORD=\"your_app_password\"' >> ~/.bashrc"
echo "   source ~/.bashrc"
echo ""
echo "4. Deploy using PythonAnywhere CLI:"
echo "   pa website create --domain $DOMAIN \\"
echo "   --command '$STREAMLIT_CMD'"
echo ""
echo "5. Management commands:"
echo "   pa website get                           # Check status"
echo "   pa website reload --domain $DOMAIN       # Reload app"
echo "   pa website delete --domain $DOMAIN       # Delete app"
echo ""

echo "⚠️  Important Notes:"
echo "- Ensure you have a paid PythonAnywhere account (Hacker tier or higher)"
echo "- Streamlit support on PythonAnywhere is currently in beta"
echo "- Generate an API token from your PythonAnywhere dashboard before deployment"
echo "- Your app will be available at: https://$DOMAIN"
echo ""

echo "📚 Documentation:"
echo "- PythonAnywhere Streamlit Guide: https://help.pythonanywhere.com/pages/Streamlit/"
echo "- TOPSIS Package: https://pypi.org/project/Topsis-Vani-102303078/"
echo ""

echo "✨ Deployment script completed!"
echo "Follow the manual steps above to complete the deployment."