# SecureExam Setup Guide

## Quick Start (5 minutes)

### 1. Start MongoDB
```bash
# On Windows, MongoDB should be running as a service
# Or start it manually:
mongod --dbpath "C:\data\db"
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Frontend will open on `http://localhost:3000`

## Complete Setup with Details

### Prerequisites Installation

#### Node.js
- Download from [nodejs.org](https://nodejs.org)
- Verify: `node --version` and `npm --version`

#### MongoDB
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Windows: Install as service or extract and run `mongod.exe`
- Verify: `mongosh` or `mongo` command

### Backend Configuration

1. **Create .env file**
```bash
cd backend
copy .env.example .env
```

2. **Edit .env with your settings**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/secure-exam
ENCRYPTION_KEY=your-secret-key-min-32-characters-long-1234567890ab
JWT_SECRET=your-jwt-secret-key-change-in-production-12345
REFRESH_TOKEN_SECRET=your-refresh-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

3. **Install dependencies**
```bash
npm install
```

4. **Seed database with test users**
```bash
npm run seed
```

Output:
```
✓ Seed users created successfully!

Test Users:
📧 Email: admin@secureexam.com
   Role: admin
   Password: Can be found in the code

📧 Email: faculty@secureexam.com
   Role: faculty
   Password: Can be found in the code

... (and more)
```

5. **Start backend server**
```bash
npm run dev
```

Expected output:
```
[timestamp] GET /api/health - 200
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

### Frontend Configuration

1. **Create .env file**
```bash
cd frontend
copy .env.example .env
```

2. **Edit .env (optional - defaults work)**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

3. **Install dependencies**
```bash
npm install
```

4. **Start frontend**
```bash
npm start
```

Browser will open `http://localhost:3000` automatically.

## Testing the Application

### 1. Login Page
- Visit `http://localhost:3000/login`
- Try demo credentials from seed data
- Example: `admin@secureexam.com` / `AdminPass123!`

### 2. Create Exam (Faculty Only)
- Login as Faculty
- Click "Create Exam" button
- Fill exam details
- Add questions
- Click "Create Exam Paper"

### 3. View Exams (All Users)
- Dashboard shows all available exams
- Click exam to view details
- Content is decrypted automatically

### 4. Admin Panel (Admin Only)
- Login as Admin
- Click "Admin Panel"
- View access logs and audit trail
- Monitor user activities

## API Testing with cURL or Postman

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "faculty",
    "department": "CS"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@secureexam.com",
    "password": "AdminPass123!"
  }'
```

Response includes `token` - use this for other requests:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/exams
```

## Project Features Checklist

### Authentication ✅
- [x] Password hashing with bcryptjs
- [x] JWT token generation
- [x] MFA with unique keys
- [x] Account lockout on failed attempts
- [x] Role-based access control

### Exam Management ✅
- [x] Create exam papers
- [x] Encrypt questions (AES-256)
- [x] Digital watermarking
- [x] Version control
- [x] Publish/Archive exams

### Security ✅
- [x] Input sanitization (XSS protection)
- [x] Rate limiting (100 req/15min)
- [x] Helmet security headers
- [x] CORS configuration
- [x] Password validation

### Logging & Auditing ✅
- [x] Access logs
- [x] Audit trail
- [x] User activity tracking
- [x] IP logging
- [x] Admin dashboard

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Services > MongoDB > should be Running
# Or start it: mongod --dbpath "C:\data\db"
```

### Port 5000 Already in Use
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in backend/.env
```

### Dependencies Missing
```bash
# Delete node_modules and lock files
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### CORS Error
Check frontend `REACT_APP_API_URL` matches backend `FRONTEND_URL`

### Encryption Key Error
Make sure `ENCRYPTION_KEY` is at least 32 characters in backend/.env

## Useful Commands

```bash
# Backend commands
npm run dev          # Start with nodemon
npm start           # Start production
npm run seed        # Seed database

# Frontend commands
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests

# Database
mongosh             # Connect to MongoDB
show dbs            # List databases
use secure-exam     # Switch to database
db.users.find()     # List users
```

## File Structure Reference

```
Backend Routes:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/mfa/enable
  POST   /api/auth/mfa/disable
  
  POST   /api/exams           (Create)
  GET    /api/exams           (List)
  GET    /api/exams/:id       (Get)
  PUT    /api/exams/:id       (Update)
  POST   /api/exams/:id/publish
  POST   /api/exams/:id/archive
  
  GET    /api/logs/logs       (Admin)
  GET    /api/logs/audit      (Admin)
  GET    /api/logs/suspicious (Admin)

Frontend Pages:
  /              → Dashboard
  /login         → Login page
  /register      → Register page
  /exam/create   → Create exam (Faculty)
  /exam/:id      → View exam details
  /admin         → Admin panel
```

## Production Deployment

### Before Going Live
1. Change all secrets in `.env`
2. Set `NODE_ENV=production`
3. Enable HTTPS/SSL certificates
4. Configure database backup
5. Set up monitoring and alerts
6. Test all security features
7. Review and approve audit logs

### Deployment Platforms
- Backend: Heroku, AWS, DigitalOcean, Railway
- Frontend: Vercel, Netlify, GitHub Pages
- Database: MongoDB Atlas

## Support & Documentation

- Backend API: See `/api/health` endpoint
- Database Schema: See `/models` folder
- Security Details: See README.md

## Next Steps

1. ✅ Start the servers (both backend and frontend)
2. ✅ Test with demo users
3. ✅ Create your first exam
4. ✅ Explore admin dashboard
5. ✅ Read through the code
6. ✅ Customize for your needs

---

Happy exam creating! 📚🔒
