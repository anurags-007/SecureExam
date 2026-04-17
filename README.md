# SecureExam - Secure Examination Platform

A complete full-stack web application for secure creation, storage, and distribution of examination papers with advanced security features.

## 🚀 Recent Updates
- **Premium UI Overhaul**: Transitioned to a modern Indigo/Violet design system with glassmorphism and enhanced UX.
- **Document Upload System**: Support for uploading existing exam papers in **PDF, DOCX, and Image** formats with secure server-side storage and authenticated downloads.
- **Improved Dashboards**: High-end data visualization for system health, integrity metrics, and real-time activity feeds.

## 🚀 Features

### 1. **Modern UI/UX**
- Premium aesthetics with smooth transitions and glassmorphism.
- Split-pane authentication layout (Login/Register).
- Detailed exam repository with action-oriented detail pages.

### 2. **Secure Exam Management**
- **Manual Entry**: Interactive form for composing digital-first exams.
- **Document Upload**: digitize existing papers with drag-and-drop ease.
- AES-256 encryption for sensitive manual content.
- Multi-layer watermarking (User ID + Timestamp).

### 3. **Access Control & Auditing**
- Role-based access (Admin, Faculty, Reviewer).
- Detailed Access Logs and Audit Trails.
- Suspicious activity detection and account lockout.

## 📋 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Multer (Uploads), bcryptjs, JWT.
- **Frontend**: React 18, React Context API, Vanilla CSS (Modernized).

## 🔧 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Setup
1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run seed  # Setup default test users
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🔐 Default Test Users
- **Admin**: `admin@secureexam.com` / `AdminPass123!`
- **Faculty**: `faculty@secureexam.com` / `FacultyPass123!`

---
**Built with ❤️ for secure education**