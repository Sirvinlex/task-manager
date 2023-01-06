const { create, findOne, findOneAndUpdate, findByIdAndUpdate } = require("../models/task");
const Task = require("../models/task");


const getAllTasks = async(req, res) =>{
    const { status, search } = req.query;
    const queryObject = {createdBy: req.user.userId,};

    try {
        
        if (search) {
            queryObject.taskName = { $regex: search, $options: 'i' };
         }
        if (status) {
            queryObject.status = status;
        }
        
        let result = Task.find(queryObject).sort("-createdAt");
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        
        result = result.skip(skip).limit(limit);

        const tasks = await result;

        const totalTasks = await Task.countDocuments(queryObject);
        
        const numOfPages = Math.ceil(totalTasks / limit);
        
        const taskFilter = await Task.find(queryObject);
        const pendingTask = taskFilter.filter((task) => task.status === "pending");
        const currentTask = taskFilter.filter((task) => task.status === "current");
        const completedTask = taskFilter.filter((task) => task.status === "completed");

        const pendingTaskCount = pendingTask.length;
        const currentTaskCount = currentTask.length;
        const completedTaskCount = completedTask.length;

        res.status(200).json({ tasks, totalTasks, numOfPages, pendingTaskCount, currentTaskCount, completedTaskCount });

        // const tasks = await Task.find({ createdBy: req.user.userId}).sort("createdAt");
        // res.status(200).json({tasks});
    } catch (error) {
        res.status(400).json(error);
    }
};
const createTask = async(req, res) =>{
    req.body.createdBy = req.user.userId;
    const { taskName, status, createdBy } = req.body
    try {
        // const task = await Task.create(req.body);
        const task = await Task.create({ taskName, status, createdBy });
        res.status(200).json({ task });
        
    } catch (error) {
        res.status(400).json(error.errors.createdBy.properties.message);
    }
};
const updateTask = async(req, res) =>{
    const { body: { taskName, status }, params: { id: taskId }, user: { userId } } = req;
    try {
        if (taskName === '' || status === '') return res.status(400).json({msg: 'Please fill in required fields'});
        const task = await Task.findByIdAndUpdate({ _id: taskId, createdBy: userId}, { taskName, status}, {new: true, runValidators: true})
        if (!task) return res.status(400).json({msg: 'No task with this Id'});
        res.status(200).json({ task });
    } catch (error) { 
        res.status(400).json(error);
    }
};
const deleteTask = async(req, res) =>{
    const { params: { id: taskId }, user: { userId } } = req;
    try {
       const task = await Task.findByIdAndRemove({ _id: taskId, createdBy: userId})
        if (!task) return res.status(400).json({msg: 'No task with this Id'});
        res.status(200).json({msg: 'Task Successfully deleted'});
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
};
const updateToCompletedTask = async(req, res) =>{
    try {
    } catch (error) {
    }
};


module.exports = {
    getAllTasks, updateToCompletedTask, updateTask, deleteTask, createTask
}

