# SecureExam - Secure Examination Platform

A complete full-stack web application for secure creation, storage, and distribution of examination papers with advanced security features.

## 🚀 Features

### 1. **User Authentication & Roles**
- Multi-factor authentication (MFA) with unique keys
- Role-based access control (Admin, Faculty, Reviewer)
- Secure password hashing with bcryptjs
- Account lockout after multiple failed login attempts

### 2. **Secure Exam Management**
- Faculty can create and manage exam papers  
- Version control for tracking edits and revisions
- Digital watermarking (user ID + timestamp)
- AES-256 encryption for sensitive content
- SHA-256 hashing for integrity verification

### 3. **Encryption & Storage**
- All exam papers encrypted before storage
- Blockchain-ready hash verification (simulated)
- Secure file handling with proper cleanup
- Encrypted database storage

### 4. **Access Control & Auditing**
- Complete access logging and audit trails
- Track who accessed what, when, and what actions performed
- Suspicious activity detection
- IP address and user agent logging

### 5. **Admin Dashboard**
- User management and role assignment
- Real-time access logs monitoring
- Comprehensive audit trail visualization
- Security alerts and suspicious activity tracking

### 6. **Security Measures**
- ✅ HTTPS/TLS ready
- ✅ Input sanitization (XSS protection)
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS enabled
- ✅ Helmet.js for security headers
- ✅ JWT-based authentication
- ✅ Password validation requirements

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Encryption**: AES-256-CBC + Crypto.js
- **Password**: bcryptjs
- **Security**: Helmet, CORS, Rate Limiting
- **Other**: Mongoose ODM, UUID, Multer

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router v6
- **Styling**: CSS3 with responsive design
- **State Management**: React Context API
- **HTTP**: Fetch API

## 🔧 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file
cp .env.example .env

# Install dependencies
npm install

# Seed test users
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Create .env file  
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Running the Application

### Option 1: Development Mode (with hot reload)
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Option 2: Production Build
```bash
# Backend
npm start

# Frontend
npm run build
npm start (requires serve package)
```

## 🔐 Default Test Users

After running `npm run seed`, use these credentials:

### Admin Account
- **Email**: admin@secureexam.com
- **Password**: AdminPass123!
- **Role**: Admin (Full system access)

### Faculty Account  
- **Email**: faculty@secureexam.com
- **Password**: FacultyPass123!
- **Role**: Faculty (Create and manage exams)

### Reviewer Account
- **Email**: reviewer@secureexam.com
- **Password**: ReviewerPass123!
- **Role**: Reviewer (Review and approve exams)

### Additional Faculty Account
- **Email**: faculty2@secureexam.com
- **Password**: Faculty2Pass123!
- **Role**: Faculty

## 📁 Project Structure

```
SecureExam/
├── backend/
│   ├── config/               # Configuration files
│   │   ├── database.js       # MongoDB connection
│   │   └── constants.js      # App constants
│   ├── controllers/          # Request handlers
│   │   ├── authController.js
│   │   ├── examPaperController.js
│   │   └── accessLogController.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── errorHandler.js  # Error handling
│   │   └── logging.js       # Request logging
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── ExamPaper.js
│   │   ├── AccessLog.js
│   │   ├── AuditTrail.js
│   │   ├── DownloadLink.js
│   │   └── Alert.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── examRoutes.js
│   │   └── loggingRoutes.js
│   ├── services/            # Business logic
│   │   ├── authService.js
│   │   ├── examPaperService.js
│   │   └── accessLogService.js
│   ├── utils/               # Utility functions
│   │   ├── encryption.js    # AES encryption
│   │   ├── generateToken.js # JWT utilities
│   │   ├── hashGenerator.js # SHA-256 hashing
│   │   └── validators.js    # Input validation
│   ├── uploads/             # File uploads storage
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   ├── seed.js              # Database seeding
│   ├── .env.example         # Environment template
│   └── package.json

├── frontend/
│   ├── public/
│   │   └── index.html       # Main HTML file
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── Navbar.css
│   │   ├── context/         # React context
│   │   │   └── AuthContext.js
│   │   ├── pages/           # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ExamCreator.js
│   │   │   ├── ExamDetail.js
│   │   │   ├── AdminPanel.js
│   │   │   └── [styles.css]
│   │   ├── App.js           # Main app component
│   │   ├── App.css
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── .env.example         # Environment template
│   └── package.json

└── README.md                # This file
```

## 🛣️ API Endpoints

### Authentication Routes
```
POST   /api/auth/register        Register new user
POST   /api/auth/login           Login user
POST   /api/auth/mfa/enable      Enable MFA
POST   /api/auth/mfa/disable     Disable MFA
```

### Exam Routes (All require JWT)
```
POST   /api/exams                Create exam paper
GET    /api/exams                List exams
GET    /api/exams/:paperId       Get specific exam
PUT    /api/exams/:paperId       Update exam
POST   /api/exams/:paperId/publish    Publish exam
POST   /api/exams/:paperId/archive    Archive exam
```

### Logging Routes (Admin only)
```
GET    /api/logs/logs            Get access logs
GET    /api/logs/user/:userId/history  Get user history
GET    /api/logs/audit           Get audit trail
GET    /api/logs/suspicious      Get suspicious activities
```

## 🔒 Security Implementation

### Password Security
- Minimum 8 characters
- Must include: uppercase, lowercase, numbers, special characters
- Hashed using bcryptjs (salt rounds: 10)

### Encryption
- AES-256-CBC for exam paper content
- SHA-256 for file integrity hashing
- JWT with 7-day expiry for tokens

### Access Control
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)
- Account lockout after 5 failed attempts
- Rate limiting (100 requests per 15 minutes)

### Data Protection
- HTTPS enforcement ready
- CORS properly configured
- Helmet security headers
- Input sanitization for XSS protection
- MongoDB injection prevention via Mongoose

## 📊 Database Schema

### User Model
- Basic info: name, email, password (hashed)
- Security: uniqueKey (for MFA), mfaEnabled
- Status: isActive, lastLogin, loginAttempts, lockUntil
- Additional: role, department, profileImage

### ExamPaper Model
- Content: encrypted AES-256, questions array
- Metadata: title, subject, class, totalMarks, duration
- Status: draft, published, archived
- Versioning: version number, revisions array
- Security: fileHash (SHA-256), watermark
- Blockchain: blockchainHash (for future use)

### AccessLog Model
- Tracking: userId, action, timestamp
- Details: ipAddress, userAgent, sessionId
- Status: success/failed/suspicious

### AuditTrail Model
- Changes: performedBy, action, entityType
- Tracking: changes (before/after), severity
- Details: ipAddress, description

## 🧪 Testing

### Manual Testing
1. Register a new user with strong password
2. Login and verify token in localStorage
3. Create an exam paper with questions
4. Publish the exam
5. View exam details (content is decrypted)
6. Check admin panel for logs

### Test Scenarios
- ✅ MFA flow (register → enable MFA → login with key)
- ✅ Encryption (create exam → verify encrypted in DB)
- ✅ Access Control (faculty cannot view drafts of others)
- ✅ Audit Trail (every action logged)
- ✅ Rate Limiting (exceed 100 requests)

## ⚙️ Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/secure-exam
ENCRYPTION_KEY=your-secret-key-min-32-chars
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod --dbpath /path/to/data
```

### Port Already in Use
```bash
# Change PORT in .env or kill the process
# Windows: netstat -ano | findstr :5000
# Kill process: taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📈 Future Enhancements

- [ ] Email notifications for suspicious activities
- [ ] PDF generation with watermarks
- [ ] Blockchain integration for hash verification
- [ ] AWS S3 integration for file storage
- [ ] Two-factor authentication (SMS/Email OTP)
- [ ] Advanced analytics dashboard
- [ ] Question bank management
- [ ] Randomized question selection
- [ ] Time-based access control
- [ ] Anonymous answer submissions

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Support

For issues, feature requests, or contributions, please create an issue in the repository.

---

**Built with ❤️ for secure education**
#   S e c u r e E x a m -  
 