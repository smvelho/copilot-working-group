#!/bin/bash
# GitHub Copilot Setup Script
# This script installs the necessary dependencies for the Copilot Working Group Workshops

set -e  # Exit on error

echo "🚀 Setting up Copilot Working Group Workshops..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Display Node.js and npm versions
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Verify installation
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now:"
    echo "  - Run 'npm run dev' to start the development server"
    echo "  - Run 'npm run test' to run tests"
    echo "  - Run 'npm run lint' to check code quality"
    echo "  - Run 'npm run build' to build for production"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
