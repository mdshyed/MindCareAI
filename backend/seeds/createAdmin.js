/**
 * Admin Seed Script
 * Usage: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=secret node seeds/createAdmin.js
 */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const logger = require('../utils/logger');

dotenv.config();

const run = async () => {
    await connectDB();

    const name = process.env.ADMIN_NAME || 'Admin';
    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!email || !plainPassword) {
        logger.error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.');
        process.exit(1);
    }

    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        const existing = await User.findOne({ email });

        if (existing) {
            existing.name = name;
            existing.password = hashedPassword;
            existing.role = 'admin';
            existing.isApproved = true;
            await existing.save();
            logger.info(`Updated existing user to admin: ${email}`);
        } else {
            await User.create({ name, email, password: hashedPassword, role: 'admin', isApproved: true });
            logger.info(`Created new admin user: ${email}`);
        }
    } catch (error) {
        logger.error(`Seed failed: ${error.message}`);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

run();
