const mongoose = require('mongoose');

let mongoServer;
let isConnected = false;

const connectDB = async () => {
  try {
    // Try in-memory MongoDB first (for development without MongoDB installed)
    if (process.env.NODE_ENV === 'development' || process.env.USE_MEMORY_DB === 'true') {
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        console.log('🔄 Starting in-memory MongoDB...');
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
          socketTimeoutMS: 10000,
          maxPoolSize: 10,
          minPoolSize: 2,
        });
        
        isConnected = true;
        console.log(`✅ MongoDB (In-Memory) Connected: ${mongoUri}`);
        return conn;
      } catch (error) {
        console.log(`⚠️  In-memory MongoDB failed: ${error.message}`);
        console.log('🔄 Attempting to connect to local MongoDB...');
      }
    }

    // Try local MongoDB connection
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-exam';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.warn('⚠️  Using mock/in-memory database - data will NOT persist!');
    console.warn('💡 To use MongoDB, install it or set MONGODB_URI environment variable');
    return null;
  }
};

// Check if database is connected
const isDBConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

// Graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    if (mongoServer) {
      console.log('\n🛑 Stopping in-memory MongoDB...');
      await mongoServer.stop();
    }
    process.exit(0);
  });
}

module.exports = connectDB;
module.exports.isDBConnected = isDBConnected;
module.exports.mongoServer = () => mongoServer;
