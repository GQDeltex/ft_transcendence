#!/bin/sh
cd /app
echo "Installing npm modules..."
npm install
$@
