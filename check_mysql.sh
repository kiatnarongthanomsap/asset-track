#!/bin/bash

echo "================================================"
echo "AssetTrack - MySQL Connection Troubleshooting"
echo "================================================"
echo ""

echo "Checking MySQL status..."
echo ""

# Check if MySQL is running
if lsof -i :3306 -i :8889 >/dev/null 2>&1; then
    echo "✅ MySQL is RUNNING"
    lsof -i :3306 -i :8889 | grep LISTEN
else
    echo "❌ MySQL is NOT RUNNING"
    echo ""
    echo "Please start MySQL using ONE of these methods:"
    echo ""
    echo "METHOD 1: MAMP GUI (Recommended)"
    echo "  1. Open MAMP application"
    echo "  2. Click 'Start Servers' button"
    echo "  3. Wait for MySQL indicator to turn green"
    echo ""
    echo "METHOD 2: MAMP Command Line"
    echo "  /Applications/MAMP/bin/startMysql.sh"
    echo ""
    echo "METHOD 3: Direct MySQL Start"
    echo "  /Applications/MAMP/Library/bin/mysqld_safe --port=8889 --socket=/Applications/MAMP/tmp/mysql/mysql.sock &"
    echo ""
fi

echo ""
echo "Testing API connection..."
response=$(curl -s 'http://localhost:8000/api.php?action=categories')
echo "$response"

if echo "$response" | grep -q "DB Connection Failed"; then
    echo ""
    echo "❌ Database connection failed"
    echo ""
    echo "Current configuration:"
    echo "  Host: 127.0.0.1"
    echo "  Port: 8889 (MAMP default)"
    echo "  User: root"
    echo "  Pass: root"
    echo "  Database: asset_track_db"
elif echo "$response" | grep -q "error"; then
    echo ""
    echo "⚠️  API error (but MySQL might be connected)"
else
    echo ""
    echo "✅ API is working!"
fi

echo ""
echo "================================================"
