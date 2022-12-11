const express = require('express');
const { getAllTasks, updateToCompletedTask, updateToPendingTask, deleteTask } = require('../controllers/tasks')
const router = express.Router();

router.get('/getAllTasks', getAllTasks);
router.patch('/updateToPendingTask/:id', updateToPendingTask);
router.get('/updateToCompletedTask/:id', updateToCompletedTask);
router.get('/deleteTask/:id', deleteTask);

module.exports = router;