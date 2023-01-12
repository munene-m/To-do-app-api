const asyncHandler = require('express-async-handler');
const Task = require("../models/Task"); 

//get Tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({"createdAt": -1});
    res.status(200).json(tasks)
})
//Create task
const newTask = asyncHandler(async (req, res) => {
    const { taskTitle, taskDescription } = req.body
    if( !taskTitle || !taskDescription ){
        res.status(400)
        throw new Error("Please enter all required fields")
    }

    const task = await Task.create({
        taskTitle,
        taskDescription
    })

    if(task){
        res.status(201)
        res.json({
            _id: task.id,
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription
        })
    } else {
        res.status(400)
        throw new Error("An error occured")
    }
})
//Find task
const singleTask = asyncHandler( async (req, res) => {
    const task = await Task.findById( req.params.id )

    if(!task){
        res.status(400)
        throw new Error("Task not found")
    } else {
        res.status(200).json(task)
    }
})
//Edit task
const updateTask = asyncHandler( async( req, res ) => {
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(404);
        throw new Error("Task not found")
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedTask)
})

//Delete task
const deleteTask =  asyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(404)
        throw new Error("Task not found")
    }

    await task.remove();
    res.status(200).json("task has been deleted")
})
module.exports = {
    getAllTasks,
    newTask,
    singleTask,
    updateTask,
    deleteTask
}