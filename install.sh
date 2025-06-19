#!/bin/bash

echo "🌹 Setting up One Page. One Obsession..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating environment file..."
    touch .env.local
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "🌐 To build for production:"
echo "   npm run build"
echo "   npm start"
echo ""
echo "💝 Your seductive journey awaits..." 