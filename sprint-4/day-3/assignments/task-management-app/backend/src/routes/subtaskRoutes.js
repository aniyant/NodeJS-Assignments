const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/subtasks', authMiddleware, subtaskController.createSubtask);
router.put('/subtasks/:subtask_id', authMiddleware, subtaskController.updateSubtask);
router.delete('/subtasks/:subtask_id', authMiddleware, subtaskController.deleteSubtask);

module.exports = router;
