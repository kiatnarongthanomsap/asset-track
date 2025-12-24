# AssetTrack - API Connection Fix Guide

## Problem
The application shows "Connection failed. Please check your API" because:
1. ✅ The Vite proxy was pointing to a remote server that's unreachable
2. ⚠️ MySQL/MAMP server is not running

## Solutions Applied

### 1. Updated Vite Configuration ✅
Changed `vite.config.js` to use local API instead of remote server:
- **Before**: `target: 'https://apps2.coop.ku.ac.th/assetpro_api'`
- **After**: `target: 'http://localhost:8000'`

### 2. Started PHP Development Server ✅
Running on port 8000 to serve `api.php`

### 3. Updated Database Connection ✅
Modified `api.php` to use MAMP's MySQL socket path

## Next Steps - START MYSQL SERVER

You need to start your MySQL server. Choose one of these options:

### Option A: Start MAMP (Recommended)
1. Open MAMP application from `/Applications/MAMP/MAMP.app`
2. Click "Start Servers" button
3. Wait for both Apache and MySQL to turn green

### Option B: Start MySQL via Command Line
```bash
/Applications/MAMP/Library/bin/mysqld_safe --port=3306 --socket=/Applications/MAMP/tmp/mysql/mysql.sock &
```

### Option C: Use Different MySQL Installation
If you have MySQL installed via Homebrew:
```bash
brew services start mysql
```

Then update `api.php` line 36 to remove the socket path:
```php
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
```

## Verify Database Setup

After starting MySQL, run these commands to set up the database:

### 1. Access MySQL (MAMP)
```bash
/Applications/MAMP/Library/bin/mysql -u root -p'kt%8156982'
```

### 2. Import Schema
```bash
/Applications/MAMP/Library/bin/mysql -u root -p'kt%8156982' < schema.sql
```

Or manually:
```sql
SOURCE /Users/kiatnarongthanomsap/Documents/@Code/react/AssetTrack/schema.sql;
```

## Test the Connection

After starting MySQL, test the API:
```bash
curl 'http://localhost:8000/api.php?action=categories'
```

Expected output:
```json
[{"id":1,"name":"Computer"},{"id":2,"name":"Appliance"}...]
```

## Running the Application

1. Make sure MySQL is running (MAMP servers started)
2. PHP server should already be running on port 8000
3. Start the React development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (usually http://localhost:5173)

## Current Status

✅ Vite proxy configured for local API
✅ PHP development server running on port 8000
✅ api.php configured for MAMP MySQL
⚠️ **MySQL server needs to be started**
⚠️ Database needs to be created/imported

## Troubleshooting

### If you see "DB Connection Failed"
- Start MAMP and ensure MySQL is running
- Check that the password in `api.php` matches your MySQL root password
- Verify the socket path exists: `ls -la /Applications/MAMP/tmp/mysql/mysql.sock`

### If you see "Invalid action" or empty response
- The API is working but the database might not have data
- Import the schema.sql file

### If the React app can't connect
- Ensure PHP server is running: `ps aux | grep php`
- Check if port 8000 is in use: `lsof -i :8000`
- Restart the dev server: `npm run dev`
