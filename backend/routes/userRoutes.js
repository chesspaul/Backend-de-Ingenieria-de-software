const express = require('express');
const router = express.Router();
const { login, register, data } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Endpoints públicos
router.post('/login', login);
router.post('/register', register);

// Endpoint privado
router.get('/data', protect, data);

module.exports = router;

