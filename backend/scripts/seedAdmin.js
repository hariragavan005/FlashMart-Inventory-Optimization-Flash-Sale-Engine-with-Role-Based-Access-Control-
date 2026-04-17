/**
 * seedAdmin.js — One-time admin seeder
 * Run from the backend root:
 *   node scripts/seedAdmin.js
 *
 * • Safe to re-run — skips creation if admin already exists.
 * • Password is hashed automatically by the User model's pre-save hook.
 * • Reads MONGO_URI from backend/.env via dotenv.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';

const ADMIN = {
  name:     'FlashMart Admin',
  email:    'admin@flashmart.com',
  password: 'StrongPass@123',   // hashed by User pre-save hook
  role:     'admin',
};

const seed = async () => {
  await connectDB();

  try {
    // Idempotent: skip if already seeded
    const existing = await User.findOne({ email: ADMIN.email });

    if (existing) {
      console.log(`⚠️  Admin already exists (${existing.email}) — skipping.`);
      return;
    }

    await User.create(ADMIN);
    console.log('✅ Admin seeded successfully!');
    console.log(`   Email   : ${ADMIN.email}`);
    console.log(`   Password: ${ADMIN.password}`);
    console.log('   ⚠️  Change the password after first login!');

  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
    console.log('🔌 DB disconnected.');
  }
};

seed();
