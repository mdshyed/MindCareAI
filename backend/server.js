const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security headers
app.use(helmet());

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Request logging
app.use((req, _res, next) => {
    logger.http(`${req.method} ${req.originalUrl}`);
    next();
});

// Auth rate limiter — tight limit for login/register
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { success: false, message: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointment', require('./routes/appointmentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8008;

connectDB().then(() => {
    app.listen(PORT, () => logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`));
});
