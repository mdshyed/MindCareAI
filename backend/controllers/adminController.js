const User = require('../models/User');
const Appointment = require('../models/Appointment');
const logger = require('../utils/logger');

// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/admin/appointments
// @access  Private (Admin)
const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
            .populate('userId', 'name email')
            .populate('counselorId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        next(error);
    }
};

// @route   DELETE /api/admin/user/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        if (user.role === 'admin') {
            return res.status(400).json({ success: false, message: 'Admin accounts cannot be deleted through this endpoint.' });
        }

        await user.deleteOne();
        logger.info(`User ${user.email} deleted by admin ${req.user.email}`);
        res.status(200).json({ success: true, message: 'User removed successfully.' });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res, next) => {
    try {
        const [students, counselors, appointments, pendingAppointments, pendingCounselors] = await Promise.all([
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'counselor', isApproved: true }),
            Appointment.countDocuments(),
            Appointment.countDocuments({ status: 'pending' }),
            User.countDocuments({ role: 'counselor', isApproved: false }),
        ]);

        res.status(200).json({
            success: true,
            data: { students, counselors, appointments, pending: pendingAppointments, pendingCounselors },
        });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/admin/pending-counselors
// @access  Private (Admin)
const getPendingCounselors = async (req, res, next) => {
    try {
        const counselors = await User.find({ role: 'counselor', isApproved: false }).select('-password');
        res.status(200).json({ success: true, count: counselors.length, data: counselors });
    } catch (error) {
        next(error);
    }
};

// @route   PATCH /api/admin/approve-counselor/:id
// @access  Private (Admin)
const approveCounselor = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role !== 'counselor') {
            return res.status(404).json({ success: false, message: 'Counselor not found.' });
        }

        user.isApproved = true;
        await user.save();

        logger.info(`Counselor ${user.email} approved by admin ${req.user.email}`);
        res.status(200).json({ success: true, message: 'Counselor approved successfully.' });
    } catch (error) {
        next(error);
    }
};

// @route   DELETE /api/admin/reject-counselor/:id
// @access  Private (Admin)
const rejectCounselor = async (req, res, next) => {
    return deleteUser(req, res, next);
};

module.exports = { getAllUsers, getAllAppointments, deleteUser, getStats, getPendingCounselors, approveCounselor, rejectCounselor };
