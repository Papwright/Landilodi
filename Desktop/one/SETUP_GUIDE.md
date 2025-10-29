# 🚀 Setup & Installation Guide

Complete guide to get the Blantyre Student Accommodation Platform running on your computer.

---

## 📋 Prerequisites

Before starting, make sure you have:

### Required Software:
1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Should show: v14.x.x or higher

2. **npm** (Node Package Manager)
   - Comes automatically with Node.js
   - Verify installation: `npm --version`
   - Should show: 6.x.x or higher

3. **Code Editor** (Recommended: VS Code)
   - Download from: https://code.visualstudio.com/

4. **Web Browser** (Chrome, Firefox, or Edge)

### Optional:
- **Git** (for version control)
- **Postman** (for API testing)

---

## 📦 Step-by-Step Installation

### Step 1: Open the Project

1. Open VS Code (or your preferred editor)
2. Go to `File` > `Open Folder`
3. Navigate to: `C:\Users\TIMOTHY\Desktop\one`
4. Click "Select Folder"

### Step 2: Open Terminal

In VS Code:
- Press `` Ctrl + ` `` (backtick) to open terminal
- Or go to `Terminal` > `New Terminal`

### Step 3: Install Backend Dependencies

```powershell
# Navigate to backend folder
cd backend

# Install all required packages
npm install

# Expected output:
# added 50+ packages
```

**This installs:**
- express (web server)
- cors (cross-origin requests)
- nodemon (auto-restart on changes)

### Step 4: Install Frontend Dependencies

Open a **NEW terminal** (click the `+` icon in terminal panel):

```powershell
# Navigate to frontend folder
cd frontend

# Install all required packages
npm install

# Expected output:
# added 1400+ packages (this is normal for React!)
```

**This installs:**
- React 19
- React DOM
- React Scripts
- Testing libraries

---

## 🏃 Running the Application

You need **TWO terminals** running simultaneously:

### Terminal 1: Start Backend Server

```powershell
# Make sure you're in the backend folder
cd backend

# Start the server
npm start
```

**Expected Output:**
```
🚀 Student Accommodation API running on port 5000
📍 Visit http://localhost:5000 to get started
```

✅ **Backend is now running on:** http://localhost:5000

**Test it:** Open browser and visit http://localhost:5000
- You should see: `{"message":"Blantyre Student Accommodation API - Welcome!"}`

### Terminal 2: Start Frontend Application

Open a **NEW terminal** window:

```powershell
# Make sure you're in the frontend folder
cd frontend

# Start React development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

✅ **Frontend is now running on:** http://localhost:3000

The browser should automatically open to the application!

---

## ✅ Verify Everything is Working

### 1. Check Backend API:

Open browser and visit: http://localhost:5000/api/accommodations

You should see JSON data with 4 sample accommodations:
```json
[
  {
    "id": 1,
    "title": "Self-Contained Room in Naperi",
    "location": "Naperi",
    ...
  },
  ...
]
```

### 2. Check Frontend Application:

Visit: http://localhost:3000

You should see:
- ✅ Purple gradient background
- ✅ Header with "🏠 Blantyre Student Hostels"
- ✅ Hero section with search bar
- ✅ 4 accommodation cards with images and details
- ✅ Book Now buttons

### 3. Test a Feature:

1. Click on any accommodation card
2. Click "View Details"
3. You should see detailed property information
4. Click "Book This Room"
5. Fill out the booking form
6. Click "Pay & Confirm Booking"
7. You should see a success confirmation!

---

## 🔧 Common Issues & Solutions

### Issue 1: Port 5000 Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change the port in backend/index.js
# Line 5: const port = 5001;
```

### Issue 2: Port 3000 Already in Use

**Error:** `Something is already running on port 3000`

**Solution:**
- Press `Y` when asked "Would you like to run the app on another port instead?"
- Or kill the process:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```powershell
# Delete node_modules and reinstall
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue 4: npm install fails

**Error:** Various npm errors

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete package-lock.json
Remove-Item package-lock.json

# Reinstall
npm install
```

### Issue 5: React won't start

**Error:** React scripts error

**Solution:**
```powershell
cd frontend

# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install

# Try starting again
npm start
```

### Issue 6: CORS Errors in Browser

**Error:** `Access to fetch at 'http://localhost:5000' has been blocked by CORS`

**Solution:**
- Make sure backend is running
- Check that `app.use(cors());` is in `backend/index.js`
- Restart both servers

---

## 🎯 Using the Application

### Test Scenario 1: Browse Accommodations

1. ✅ Open http://localhost:3000
2. ✅ Scroll down to see all 4 properties
3. ✅ Note different locations: Naperi, Chichiri, Sunnyside, Namiwawa
4. ✅ Check prices: ranging from MK 35,000 to MK 120,000

### Test Scenario 2: Search & Filter

1. ✅ In search bar, type "Naperi"
2. ✅ Click "🔍 Search"
3. ✅ Should see only 1 result (Naperi property)
4. ✅ Clear search and try different filters

### Test Scenario 3: Make a Booking

1. ✅ Click "Book Now" on any property
2. ✅ Fill in form:
   - Name: John Banda
   - Email: john@must.ac.mw
   - Phone: +265 888 123 456
   - University ID: MUST2024001
   - Check-in: Tomorrow's date
   - Check-out: Next month
   - Payment: Airtel Money
3. ✅ Click "Pay MK X & Confirm Booking"
4. ✅ See success confirmation with transaction ID

### Test Scenario 4: User Registration

1. ✅ Click "Register" in header
2. ✅ Fill in details
3. ✅ Select "I'm a Student"
4. ✅ Click "Register"
5. ✅ Should see success message
6. ✅ Click "Login" and use same credentials

---

## 📂 Project File Structure

```
C:\Users\TIMOTHY\Desktop\one\
│
├── backend/
│   ├── index.js              ← Main server file (API endpoints)
│   ├── package.json          ← Backend dependencies
│   ├── package-lock.json     ← Locked versions
│   └── node_modules/         ← Installed packages (auto-generated)
│
├── frontend/
│   ├── public/
│   │   ├── index.html        ← HTML template
│   │   ├── favicon.ico       ← Site icon
│   │   └── manifest.json     ← PWA settings
│   │
│   ├── src/
│   │   ├── App.js            ← Main React component ⭐
│   │   ├── App.css           ← All styling ⭐
│   │   ├── index.js          ← React entry point
│   │   └── index.css         ← Global styles
│   │
│   ├── package.json          ← Frontend dependencies
│   ├── package-lock.json     ← Locked versions
│   └── node_modules/         ← Installed packages (auto-generated)
│
├── README.md                 ← Main documentation
├── PROJECT_OVERVIEW.md       ← Detailed project info
└── SETUP_GUIDE.md           ← This file
```

**Key Files to Edit:**
- `backend/index.js` - Add/modify API endpoints
- `frontend/src/App.js` - Add/modify React components
- `frontend/src/App.css` - Change styling

---

## 🛠️ Development Workflow

### Making Changes to Backend:

1. Edit `backend/index.js`
2. Save file (Ctrl+S)
3. Backend auto-restarts (if using nodemon)
4. Test at http://localhost:5000

### Making Changes to Frontend:

1. Edit `frontend/src/App.js` or `App.css`
2. Save file (Ctrl+S)
3. Browser auto-refreshes (hot reload)
4. See changes immediately

### Adding New API Endpoint:

```javascript
// In backend/index.js, add:
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint works!' });
});

// Test at: http://localhost:5000/api/test
```

### Adding New React Component:

```javascript
// In frontend/src/App.js, add:
function NewComponent() {
  return (
    <div>
      <h2>My New Component</h2>
    </div>
  );
}

// Use it: <NewComponent />
```

---

## 📊 Testing the API with Postman

### Install Postman (Optional)

Download from: https://www.postman.com/downloads/

### Test Endpoints:

**1. Get All Accommodations:**
- Method: GET
- URL: http://localhost:5000/api/accommodations
- Click "Send"
- Should return array of 4 properties

**2. Create a Booking:**
- Method: POST
- URL: http://localhost:5000/api/bookings
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "accommodationId": 1,
  "studentName": "John Banda",
  "studentEmail": "john@must.ac.mw",
  "studentPhone": "+265 888 123 456",
  "universityId": "MUST2024001",
  "checkInDate": "2025-03-05",
  "checkOutDate": "2025-07-30",
  "paymentMethod": "airtel"
}
```
- Click "Send"
- Should return booking confirmation

---

## 🚀 Next Steps

### For Development:
1. ✅ Add more sample data to backend
2. ✅ Implement photo upload for landlords
3. ✅ Add review and rating system
4. ✅ Create admin dashboard

### For Production:
1. 🔴 Set up real database (MongoDB/PostgreSQL)
2. 🔴 Integrate real payment APIs
3. 🔴 Add proper authentication (JWT)
4. 🔴 Enable HTTPS with SSL
5. 🔴 Deploy to cloud hosting

---

## 💡 Tips for Success

### Keep Both Terminals Open:
- Don't close backend terminal
- Don't close frontend terminal
- Both need to run simultaneously

### Watch for Errors:
- Check terminal output for error messages
- Check browser console (F12) for frontend errors
- Read error messages carefully

### Save Your Work:
- Use Git for version control
- Commit changes regularly
- Push to GitHub for backup

### Learn as You Go:
- Read the code comments
- Experiment with changes
- Break things and fix them!

---

## 📞 Getting Help

### If Stuck:
1. Check error messages in terminal
2. Check browser console (F12)
3. Read this guide again
4. Search error message on Google
5. Ask on Stack Overflow

### Resources:
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Node.js Docs: https://nodejs.org/docs
- MDN Web Docs: https://developer.mozilla.org

---

## ✅ Checklist

Before starting development, make sure:

- [ ] Node.js installed
- [ ] npm working
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can see accommodations in browser
- [ ] Can make a test booking
- [ ] Both terminals stay open

---

**🎉 Congratulations!**

You now have a fully functional student accommodation booking platform running locally!

Next: Explore the code, make changes, and build amazing features!

---

**Questions?** Review the troubleshooting section or check PROJECT_OVERVIEW.md for more details.
