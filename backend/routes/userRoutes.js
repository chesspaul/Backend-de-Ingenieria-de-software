const express = require('express')
const router = express.Router()
const {login, register, data} = require('../controllers/users/Controllers')
const {protect} = require("../middleware/authMiddleware");
const {protec} = require("../middleware/authMiddleware");
router.get("/", protect, getTareas);
router.post("/", protect, createTareas);

//endpoints publicos
router.post('/login', login)
router.post('/register', register)

//endpoint privado
router.get('/data', protect, data)

module.exports = router

