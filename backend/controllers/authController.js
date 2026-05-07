const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');

// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role, speciality, credentials } = req.body;

        // Admin registration is blocked via self-registration entirely.
        // Admins must be seeded directly via the seed script.
        if (role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin accounts cannot be created through self-registration.',
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isApproved = role !== 'counselor';

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            speciality: role === 'counselor' ? speciality : undefined,
            credentials: role === 'counselor' ? credentials : undefined,
            isApproved,
        });

        logger.info(`New user registered: ${user.email} (${user.role})`);

        const responseData = {
            success: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
        };

        if (isApproved) {
            responseData.token = generateToken(user.id, user.role);
        }

        res.status(201).json(responseData);
    } catch (error) {
        next(error);
    }
};

// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        if (user.role === 'counselor' && !user.isApproved) {
            return res.status(403).json({
                success: false,
                message: 'Your account is pending approval by an administrator.',
            });
        }

        logger.info(`User logged in: ${user.email} (${user.role})`);

        res.json({
            success: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            token: generateToken(user.id, user.role),
        });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/auth/counselors
// @access  Public
const getCounselors = async (req, res, next) => {
    try {
        const counselors = await User.find({ role: 'counselor', isApproved: true })
            .select('name email speciality createdAt')
            .sort({ name: 1 });
        res.status(200).json({ success: true, count: counselors.length, data: counselors });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, getCounselors, getMe };
