require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/database');

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create test users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@secureexam.com',
        password: 'AdminPass123!',
        role: 'admin',
        department: 'Administration',
      },
      {
        name: 'Dr. John Faculty',
        email: 'faculty@secureexam.com',
        password: 'FacultyPass123!',
        role: 'faculty',
        department: 'Computer Science',
      },
      {
        name: 'Prof. Jane Reviewer',
        email: 'reviewer@secureexam.com',
        password: 'ReviewerPass123!',
        role: 'reviewer',
        department: 'Quality Assurance',
      },
      {
        name: 'Faculty Member Two',
        email: 'faculty2@secureexam.com',
        password: 'Faculty2Pass123!',
        role: 'faculty',
        department: 'Mathematics',
      },
    ];

    const createdUsers = await User.create(users);

    console.log('✓ Seed users created successfully!');
    console.log('\nTest Users:');
    createdUsers.forEach((user) => {
      console.log(`\n📧 Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password: Can be found in the code`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
