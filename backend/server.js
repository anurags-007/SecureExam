const app = require('./app');
const connectDB = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('🚀 Starting SecureExam backend server...');
    
    // Connect to database BEFORE starting the server
    console.log('📡 Connecting to database...');
    await connectDB();
    
    // Auto-seed if needed
    const autoSeed = require('./utils/autoSeed');
    await autoSeed();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`💻 Frontend: http://localhost:3000`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();