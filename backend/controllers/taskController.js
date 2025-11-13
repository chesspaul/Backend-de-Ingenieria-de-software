const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
});


const createTasks = asyncHandler(async (req, res) => {
    if(!req.body.texto) {
        res.status(400);
        throw new Error('Please add a texto field');
    }
    const task = await Task.create({
        texto: req.body.texto,
        user: req.user.id
    });
    res.status(201).json(task);
});

const updateTasks = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Check if user owns the task
    if(task.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }

    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateTask);
});

const deleteTasks = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    
    if(!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    if(task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json();
});

module.exports = { 
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks
 };