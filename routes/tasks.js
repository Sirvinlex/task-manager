const express = require('express');
const { getAllTasks, updateToCompletedTask, updateTask, deleteTask, createTask } = require('../controllers/tasks')
const router = express.Router();

router.get('/getAllTasks', getAllTasks);
router.post('/createTask', createTask);
router.patch('/updateTask/:id', updateTask);
router.get('/updateToCompletedTask/:id', updateToCompletedTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;
 