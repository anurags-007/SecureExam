# SecureExam Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
├─────────────────────────────────────────────────────────────┤
│  Pages: Login, Register, Dashboard, ExamCreator, AdminPanel │
│  Context: AuthContext (User state management)               │
│  Components: Navbar, PrivateRoute                           │
└──────────────┬──────────────────────────────────────────────┘
               │ HTTP/HTTPS
               │ JWT Bearer Token
               ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                  │
├─────────────────────────────────────────────────────────────┤
│  Middleware: Auth, ErrorHandler, Logging, Rate Limiting     │
│  Routes:    /api/auth, /api/exams, /api/logs               │
│  Controllers: Auth, ExamPaper, AccessLog                    │
│  Services: Auth, ExamPaper, AccessLog                       │
│  Models: User, ExamPaper, AccessLog, AuditTrail, etc.      │
└──────────────┬──────────────────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE (MongoDB)                         │
├─────────────────────────────────────────────────────────────┤
│  Collections: users, exams, logs, audits, alerts, etc.     │
│  Encryption: AES-256 for sensitive fields                  │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
1. REGISTRATION
   User → Frontend form → Backend /register → Validate → Hash password → Create user → Return JWT

2. LOGIN
   User → Frontend form → Backend /login → Verify email → Compare password → Check MFA
   ├─ If no MFA: Return token
   └─ If MFA enabled: Request unique key → Verify key → Return token

3. PROTECTED ROUTES
   Frontend stores JWT → Authorization header → Middleware verifies → Allow/Deny access
```

## Exam Creation & Encryption Flow

```
1. Faculty creates exam with questions
2. Frontend validates input
3. Send to backend /api/exams
4. Backend:
   a. Validate data
   b. Encrypt questions with AES-256
   c. Generate SHA-256 hash
   d. Create watermark (userId + timestamp)
   e. Save to MongoDB
   f. Log audit trail
5. Return exam ID
6. Frontend redirects to dashboard
```

## Access Control & Logging

```
Every request:
1. Middleware gets client IP and User Agent
2. Process request
3. If action performed:
   a. Log AccessLog
   b. Log AuditTrail (for sensitive actions)
4. Return response

Admin can view:
- All AccessLogs
- Audit trail
- Suspicious activities
- User history
```

## Security Layers

### Layer 1: Input Protection
- Sanitization (XSS prevention)
- Validation (type, length, format)
- Rate limiting (100 req/15min)

### Layer 2: Authentication
- Password hashing (bcryptjs)
- JWT tokens (7-day expiry)
- Multi-factor authentication (optional)
- Account lockout (after 5 failed attempts)

### Layer 3: Encryption
- AES-256-CBC for content
- SHA-256 for hashing
- Fields saved encrypted in database

### Layer 4: Authorization
- Role-based access control
- Endpoint protection
- Method restrictions

### Layer 5: Logging
- Access logs
- Audit trail
- Suspicious activity detection
- IP tracking

## Database Relationships

```
User (1) ──→ (Many) ExamPaper
  │
  ├──→ (Many) AccessLog
  ├──→ (Many) AuditTrail
  └──→ (Many) Alert

ExamPaper (1) ──→ (Many) DownloadLink
  │
  ├──→ (Many) AccessLog
  └──→ (Many) AuditTrail

ExamPaper (1) ──→ (Many) Revision
```

## Encryption Implementation

### AES-256-CBC
```
plaintext → IV (random 16 bytes) → Cipher with key → encrypted data + IV
encrypted data + IV → Decipher with key → plaintext
```

### SHA-256
```
content → hash function → 64-character hex string
Used for integrity verification, not decryption
```

## Token Structure (JWT)

```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": "user_id",
  "email": "user@example.com",
  "role": "faculty",
  "iat": 1234567890,
  "exp": 1234654290
}

Signature: HMAC-SHA256(base64(header) + "." + base64(payload), secret)
```

## API Request/Response Cycle

```
1. Frontend sends request with JWT in Authorization header
2. Middleware extracts and verifies JWT
3. Sets req.user with decoded token data
4. Route handler receives request
5. Access control checked (role authorization)
6. Business logic executed
7. Data logged (AccessLog/AuditTrail)
8. Response sent with data and metadata
9. Frontend processes response
10. Updates UI state
```

## Error Handling

```
Try-Catch Blocks:
  Service → Controller → Middleware

Error Types:
- ValidationError: 400
- AuthenticationError: 401
- AuthorizationError: 403
- NotFoundError: 404
- ServerError: 500

Response Format:
{
  "error": "Error message",
  "requestId": "unique-id",
  "timestamp": "2024-01-17T10:00:00Z"
}
```

## Performance Optimizations

1. **Database Indexing**
   - userId on AccessLog
   - createdAt on AuditTrail
   - fileHash on ExamPaper

2. **Caching**
   - JWT tokens stored in localStorage (frontend)
   - User data in context

3. **Pagination** (can be added)
   - Limit results in logs
   - Implement cursors for large datasets

4. **Rate Limiting**
   - Express rate limit middleware
   - 100 requests per 15 minutes

## Scalability Considerations

### For 1,000+ Concurrent Users:
1. Use MongoDB Atlas (cloud)
2. Implement caching (Redis)
3. Add API gateway
4. Horizontal scaling of backend servers
5. CDN for frontend assets
6. Database replication

### For 100,000+ Exams:
1. Archive old exams
2. Implement search indexing
3. Sharding strategy
4. Separate read/write databases

## Testing Strategy

### Unit Tests
- Auth service functions
- Encryption/Decryption
- Validation functions
- Hash generation

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### Security Tests
- SQL injection prevention
- XSS prevention
- Brute force protection
- Encryption verification

## Monitoring & Alerts

### Metrics to Track
- Request count
- Response times
- Error rates
- Failed login attempts
- Suspicious activities
- Database connection health

### Alerts
- Multiple failed logins
- Unusual access patterns
- API error spikes
- Database issues
- Security violations

## GDPR & Compliance

- User data encryption at rest
- Secure deletion of archived exams
- Access logs retention policy
- User consent management
- Data export functionality

---

This architecture ensures security, scalability, and maintainability.
