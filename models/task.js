const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {
        type:String,
        maxLength: 55,
    },
    status: String,
    createdBy :{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required : [true, 'Please provide user']
    }
},
{ timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;