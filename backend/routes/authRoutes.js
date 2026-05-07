const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCounselors, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validation/authSchemas');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/counselors', getCounselors);
router.get('/me', protect, getMe);

module.exports = router;
