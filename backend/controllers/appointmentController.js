const Appointment = require('../models/Appointment');
const User = require('../models/User');
const logger = require('../utils/logger');

// @route   POST /api/appointment/book
// @access  Private (Student)
const bookAppointment = async (req, res, next) => {
    try {
        const { counselorId, date, time, concern, anonymous } = req.body;

        const counselor = await User.findById(counselorId);
        if (!counselor || counselor.role !== 'counselor' || !counselor.isApproved) {
            return res.status(400).json({ success: false, message: 'Invalid or unavailable counselor.' });
        }

        const appointment = await Appointment.create({
            userId: req.user.id,
            counselorId,
            date,
            time,
            concern,
            anonymous: !!anonymous,
            status: 'pending',
        });

        logger.info(`Appointment booked by ${req.user.email} with counselor ${counselor.email}`);
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/appointment/my
// @access  Private (Student)
const getMyAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id })
            .populate('counselorId', 'name email speciality')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        next(error);
    }
};

// @route   GET /api/appointment/counselor
// @access  Private (Counselor)
const getCounselorAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ counselorId: req.user.id })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        next(error);
    }
};

// @route   PATCH /api/appointment/:id/status
// @access  Private (Counselor)
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found.' });
        }

        if (appointment.counselorId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this appointment.' });
        }

        appointment.status = status;
        await appointment.save();

        logger.info(`Appointment ${appointment._id} status updated to ${status} by ${req.user.email}`);
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        next(error);
    }
};

module.exports = { bookAppointment, getMyAppointments, getCounselorAppointments, updateAppointmentStatus };
