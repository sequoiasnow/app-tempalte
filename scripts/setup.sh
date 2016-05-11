#!/bin/bash

# Sets up an initial project by simply executing some commands 
# that woud otherwise be annoying.

# Move to the correct directory.
cd ..

# Start git
git init
git add .
git commit -m 'First Commit'

# Add basic workflow files.
touch README.MD
echo "node_modules" > .gitignore

# Add src files
mkdir src
mkdir src/app
mkdir src/styles
mkdir src/app/data
mkdir src/app/windows
mkdir src/app/applications
mkdir src/app/helpers
touch src/app/app.js

# Add styles file
touch src/styles/main.scss
mkdir src/styles/abstracts
mkidr src/styles/base
mkdir src/styles/components
mkdir src/styles/layout
mkdir src/styles/vendors
mkdir src/styles/themes

# Add some basic system files
touch gulpfile.js

# Initiate the npm package
npm init

