#!/bin/bash

echo "🚀 Skincare App Deployment Helper"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - Skincare Advisor App"
    echo "✅ Git initialized and committed"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Name it: skincare-advisor"
echo "   - Don't initialize with README"
echo "   - Click 'Create repository'"
echo ""
echo "2. After creating the repo, run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/skincare-advisor.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Click 'Add New Project'"
echo "   - Import your skincare-advisor repo"
echo "   - Add environment variables (see VERCEL_SETUP.md)"
echo "   - Click 'Deploy'"
echo ""
echo "📖 For detailed instructions, see VERCEL_SETUP.md"
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected!"
    read -p "Do you want to create the GitHub repo now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Creating GitHub repository..."
        gh repo create skincare-advisor --public --source=. --remote=origin --push
        echo "✅ Repository created and pushed!"
    fi
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo ""
    echo "✅ Vercel CLI detected!"
    read -p "Do you want to deploy to Vercel now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Deploying to Vercel..."
        vercel --prod
        echo "✅ Deployment started!"
    fi
fi

echo ""
echo "✨ Done! Your app should be deploying now."

