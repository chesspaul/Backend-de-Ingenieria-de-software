const express = require('express');
const router = express.Router();
const { getTasks, createTasks, updateTasks, deleteTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTasks);
router.post('/', protect, createTasks);

router.put('/:id', protect, updateTasks);
router.delete('/:id', protect, deleteTasks);

module.exports = router;