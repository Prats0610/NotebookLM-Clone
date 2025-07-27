#!/bin/bash

echo "🚀 Starting Backend..."
cd backend
npm install
npm start &
BACK_PID=$!

cd ../frontend
echo "🌐 Starting Frontend..."
npm install
npm start

# Kill backend when frontend exits
kill $BACK_PID
