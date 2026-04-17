const User = require('../models/User');

/**
 * Automatically seed the database if it's empty
 */
const autoSeed = async () => {
  try {
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      console.log('✅ Database already has users, skipping auto-seed.');
      return;
    }

    console.log('🔄 Database is empty. Seeding test users...');
    
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

    await User.create(users);
    console.log('✓ Test users seeded successfully!');
  } catch (error) {
    console.error('⚠️ Auto-seeding failed:', error.message);
  }
};

module.exports = autoSeed;
