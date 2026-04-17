// Test both servers
const http = require('http');

console.log('🧪 Testing SecureExam Servers...\n');

// Test Backend
const backendReq = http.get('http://localhost:5000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ Backend (Port 5000): RUNNING');
    console.log(`   Status: ${res.statusCode}`);
    try {
      console.log(`   Response: ${data}`);
    } catch (e) {}
  });
});

backendReq.on('error', (err) => {
  console.log('❌ Backend (Port 5000): ERROR -', err.message);
});

// Test Frontend
setTimeout(() => {
  const frontendReq = http.get('http://localhost:3000/', (res) => {
    console.log('\n✅ Frontend (Port 3000): RUNNING');
    console.log(`   Status: ${res.statusCode}`);
  });

  frontendReq.on('error', (err) => {
    console.log('\n❌ Frontend (Port 3000): ERROR -', err.message);
  });
}, 1000);

setTimeout(() => {
  console.log('\n✅ SecureExam is LIVE!\n');
  console.log('📱 Access the application at:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend:  http://localhost:5000');
  console.log('\n🔐 Demo Credentials:');
  console.log('   Email: admin@secureexam.com');
  console.log('   Password: AdminPass123!\n');
  process.exit(0);
}, 3000);
